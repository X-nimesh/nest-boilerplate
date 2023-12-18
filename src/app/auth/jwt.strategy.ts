import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { env } from 'src/config/env';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWTSECRET,
    });
  }
  async validate(payload: any) {
    const user = await this.userService.findOneUsersByID(payload.id);
    return { userId: user.id, email: user.email, phone: user.phone };
  }
}
