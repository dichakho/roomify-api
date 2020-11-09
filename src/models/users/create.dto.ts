import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@src/entities/roles.entity';
import { CheckRoleOfUser } from '@src/validators/users/create-user-role.validator';
import { ExistedUsernameValidator } from '@src/validators/users/exist-username.validator';
import { IsString, IsEmail, IsMobilePhone, IsObject, Validate, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ example: 'Admin' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  @IsString()
  @Validate(ExistedUsernameValidator)
  username: string;

  @ApiProperty({ example: 'member@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'admin', writeOnly: true })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: '0981234899' })
  @IsNotEmpty()
  @IsString()
  @IsMobilePhone('vi-VN')
  phone: string;

  @ApiProperty({
    example:
      'https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png'
  })
  @IsOptional()
  @IsString()
  avatar: string;

  @ApiProperty({ example: { id: 1 } })
  @IsObject()
  @Validate(CheckRoleOfUser)
  roles: Role[];

}
