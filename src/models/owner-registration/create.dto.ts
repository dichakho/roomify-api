import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateOwnerRegistrationDto {
  @ApiProperty({ example: 123456789 })
  @IsNotEmpty()
  @Transform(parseInt)
  @IsInt()
  @Max(999999999)
  @Min(100000000)
  IDNumber: number
}
