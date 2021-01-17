import { BadRequestException } from "@nestjs/common";

export class NotFoundException extends BadRequestException {
  constructor(readonly message: string, error?: any){
    super(error, message)
  }

}