import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsStrongPassword,
  ValidateIf,
} from 'class-validator';

export class UsersLoginDto {
  @ApiProperty({
    default: 'nimesh@gmail.com',
  })
  @IsNotEmpty({
    message: 'email is required',
  })
  @IsEmail(
    {},
    {
      message: 'Email is invalid',
    },
  )
  email: string;

  @ApiProperty({
    default: 'Nimesh@123',
  })
  @IsNotEmpty({
    message: 'password is required',
  })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
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

  @ApiProperty({
    default: 'Nimesh@123',
  })
  @IsNotEmpty({
    message: 'confirmPassword is required',
  })
  @IsIn([Math.random()], {
    message: 'Passwords do not match',
  })
  @ValidateIf((o) => o.password !== o.confirmPassword)
  confirmPassword: string;
}
