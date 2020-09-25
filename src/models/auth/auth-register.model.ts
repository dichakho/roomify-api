import { IsString, IsNotEmpty, Length, Matches, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UniqueUsernameValidator } from '../../validators/auth/unique-username.validator';

export class RegisterDto {

  @IsNotEmpty()
  @Length(5, 30)
  @Validate(UniqueUsernameValidator, { message: 'Username already exists' })
  @ApiProperty({ example: 'admin123' })
  username: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'admin' })
  fullName: string

  @IsNotEmpty()
  @ApiProperty({ example: '060606' })
  @IsString()
  code: string

  @IsString()
  @IsNotEmpty()
  @Length(5, 24)
  @Matches(/((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password must be contain uppercase, lowercase, number and special character' })
  @ApiProperty({ example: 'Admin123!' })
  password: string
}
