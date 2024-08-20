import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigs } from './config/dbConfig';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './app/auth/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfigs()), AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
