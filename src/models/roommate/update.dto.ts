import { ApiProperty } from '@nestjs/swagger';
import { ExistedDestinationValidator } from '@src/validators/property/exist-destination.validator';
import { IsNumber, IsOptional, IsString, Validate } from 'class-validator';

export class UpdateRoommateDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 95.111 })
  price: number

  @ApiProperty({ example: 'lorem ipsum ....' })
  @IsOptional()
  @IsString()
  description: string

  @ApiProperty({ example: 100 })
  @IsOptional()
  @IsNumber()
  @Validate(ExistedDestinationValidator)
  destinationId: number

}
