import { ApiProperty } from '@nestjs/swagger';
import { User } from '@src/entities/user.entity';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional } from 'class-validator';

export class CreateOwnerRegistrationDto {
  @ApiProperty({ example: { id: 3 } })
  @IsNotEmptyObject()
  user: User

  @ApiProperty({ example: 123456789 })
  @IsNotEmpty()
  @Transform(parseInt)
  @IsNumber()
  IDNumber: number
}
