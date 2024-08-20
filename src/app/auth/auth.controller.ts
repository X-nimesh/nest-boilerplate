import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto, UsersLoginDto } from './dto/auth.dto';
import { Public } from './decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body: UsersLoginDto) {
    return this.authService.login(body);
  }

  @Public()
  @Post('sign-up')
  async signUp(@Body() body: UserRegisterDto) {
    return this.authService.signUp(body);
  }
}
