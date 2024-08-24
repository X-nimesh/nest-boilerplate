import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    const isMatch = await bcrypt.compare(body?.password, userDetails.password);
    if (!isMatch) {
      throw new HttpException('Invalid Credential', HttpStatus.UNAUTHORIZED);
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
    const hashedPassword: any = await bcrypt.hash(body.password, 10);
    // check email already exist or not
    const userExist = await this.userRepository.findOne({
      where: { email: body.email },
      select: {
        userId: true,
      },
    });
    if (userExist) {
      throw new HttpException('User already exist!', HttpStatus.CONFLICT);
    }
    const userDet = await this.userRepository.save({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });
    delete userDet.password;
    return userDet;
  }
}
