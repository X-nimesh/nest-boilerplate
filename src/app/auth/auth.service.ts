import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterDto, UsersLoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async login(body: UsersLoginDto) {
    const userDetails = await this.userRepository.findOne({
      where: { email: body.email },
      select: {
        userId: true,
        password: true,
      },
    });
    if (!userDetails) {
      return 'User not found';
    }
    const isMatch = await bcrypt.compare(body?.password, userDetails.password);
    if (!isMatch) {
      return 'Invalid credentials';
    }
    const payload = { userId: userDetails.userId };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
    };
  }
  async signUp(body: UserRegisterDto) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const userDet = await this.userRepository.save({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });
    return { name: userDet.name };
  }
}
