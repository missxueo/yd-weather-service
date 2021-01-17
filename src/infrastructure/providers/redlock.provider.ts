import { CACHE_MANAGER, Provider } from "@nestjs/common";
import Redlock = require("redlock");
import { Cache } from 'cache-manager';
import * as RedisStore from 'cache-manager-redis-store';

export const REDLOCK_PROVIDER = 'REDLOCK_PROVIDER';


export const redlockProviderFactory: Provider<Redlock> = {
  provide: REDLOCK_PROVIDER,
  inject: [CACHE_MANAGER, ],
  useFactory(cacheManager: Cache){
    const client0 = (cacheManager.store as RedisStore).getClient();
    return new Redlock([ client0, ]);
  }
}


