import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request } from "express";
import { v4 as uuid } from 'uuid'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly logger: Logger,
  ){}

  use(req: Request, res: Response, next: () => void) {
    const eventId = uuid();
    (req as any).__event_id = eventId;
    (req as any).__request_ts = new Date().getTime();

    this.logger.debug(`req:[${eventId}]: ${req.url} begin` )
    next();
    const reqTs = new Date().getTime() - (req as any).__request_ts;
    this.logger.debug(`req:[${eventId}] finished, use: ${reqTs} ms` );
  }

}