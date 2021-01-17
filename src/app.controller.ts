import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('home')
@Controller()
export class AppController {
  constructor() {}

  @ApiOperation({
    summary: 'home',
  })
  @Get()
  getGreet(): string {
    return `<h1>HELLO WEATHER</h1>`;
  }
}
