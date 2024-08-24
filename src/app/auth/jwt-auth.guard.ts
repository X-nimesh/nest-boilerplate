import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_ADMIN_KEY, IS_PUBLIC_KEY } from './decorator';
import { User } from '../user/user.entity';
// interface User {
//   id: number;
//   username: string;
//   role: string;
// }
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  checkadmin = false;
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const isAdmin = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    if (isAdmin) {
      this.checkadmin = true;
    }
    return super.canActivate(context);
  }
  handleRequest<TUser = User>(err: Error | null, user: TUser): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    // if (this.checkadmin) {
    //   if (user.role !== 'admin') {
    //     throw err || new UnauthorizedException('Not an Admin');
    //   }
    // }
    return user;
  }
}
