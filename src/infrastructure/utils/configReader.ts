import { CacheModuleOptions } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as RedisStore from 'cache-manager-redis-store';
import Redis from 'redis'


export default class ConfigReader{
  constructor(private readonly configService: ConfigService,){
  }

  readDbConfig(): TypeOrmModuleOptions {
    return {
      type: this.configService.get<"mysql">("DB_TYPE"),
      host: this.configService.get<string>("DB_HOST"),
      port: Number.parseInt(this.configService.get("DB_PORT")) || 3306,
      database: this.configService.get<string>("DB_DATABASE"),
      username: this.configService.get<string>("DB_USERNAME"),
      password: this.configService.get<string>("DB_PASSWORD"),
    };
  }

  readRedisConfig(): CacheModuleOptions {
    return {
      store: RedisStore,
      host: this.configService.get("REDIS_HOST"),
      port: Number.parseInt(this.configService.get("REDIS_PORT")) || 6379,
      db: Number.parseInt(this.configService.get("REDIS_DB")) || 0,
      auth_pass: this.configService.get("REDIS_PASSWORD"),
    }
  }

  readIORedisConfig() {
    return {
      host: this.configService.get("REDIS_HOST"),
      port: Number.parseInt(this.configService.get("REDIS_PORT")) || 6379,
      db: Number.parseInt(this.configService.get("REDIS_DB")) || 0,
      auth_pass: this.configService.get("REDIS_PASSWORD"),
    }
  }

}

