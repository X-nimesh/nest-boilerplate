import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './app/auth/decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): any {
    return this.appService.getHello();
  }
}
