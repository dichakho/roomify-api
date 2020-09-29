import { IsString, IsNotEmpty, Length, Matches, Validate, IsMobilePhone } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TokenIDValidator } from '@src/validators/auth/tokenID.validator';
import { UniquePhoneValidator } from '@src/validators/auth/unique-phone.validator';
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
  @IsMobilePhone('vi-VN')
  @Validate(UniquePhoneValidator, { message: 'Phone number already exists' })
  @ApiProperty({ example: '0905009313' })
  phone: string

  @ApiProperty({ example: 'babab21123213asd' })
  @IsString()
  @Validate(TokenIDValidator, { message: 'Token is invalid' })
  tokenID: string

  @IsString()
  @IsNotEmpty()
  @Length(5, 24)
  @Matches(/((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password must be contain uppercase, lowercase, number and special character' })
  @ApiProperty({ example: 'Admin123!' })
  password: string
}
