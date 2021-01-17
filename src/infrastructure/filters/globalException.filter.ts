import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { fail } from '../utils/responseUtils'
import { Response } from 'express'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: Logger,
  ){}

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error('catch error', exception + '');
    const result = fail('unknow-error');
    if(host.getType() === 'http'){
      const ctx = host.switchToHttp();
      ctx.getResponse<Response>()
        .sendStatus(200)
        .json(result)
        ;
    }
  }
}