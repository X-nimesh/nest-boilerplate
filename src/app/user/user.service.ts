import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async findOnebyEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { email: email },
    });
  }
  async findOneUsersByID(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { userId: id },
    });
  }
}
