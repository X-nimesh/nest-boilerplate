import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigs } from './config/dbConfig';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './app/auth/jwt-auth.guard';
import { PageTransferResponseInterceptor } from './interceptor/response.interceptor';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfigs()), AuthModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_INTERCEPTOR, useClass: PageTransferResponseInterceptor },
  ],
})
export class AppModule {}
