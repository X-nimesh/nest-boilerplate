import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UsersLoginDto {
  @ApiProperty({
    default: 'nimesh@gmail.com',
  })
  @IsNotEmpty({
    message: 'email is required',
  })
  email: string;

  @ApiProperty({
    default: 'Nimesh@123',
  })
  @IsNotEmpty({
    message: 'password is required',
  })
  password: string;
}

export class UserRegisterDto extends UsersLoginDto {
  @ApiProperty({
    default: 'Nimesh',
  })
  @IsNotEmpty({
    message: 'name is required',
  })
  name: string;
}
