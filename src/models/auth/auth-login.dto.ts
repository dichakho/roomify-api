import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'admin' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '123456' })
  password: string;
}
