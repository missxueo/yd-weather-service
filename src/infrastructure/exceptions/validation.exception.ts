import { BadRequestException } from "@nestjs/common";

export class ValidationException extends BadRequestException {
  constructor(readonly message: string, readonly reason?: any, error?: any ){
    super(error, message);
  }
}
