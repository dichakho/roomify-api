import { ApiProperty } from '@nestjs/swagger';
import { ExistedDestinationValidator } from '@src/validators/property/exist-destination.validator';
import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';

export class CreateRoomateDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 95.111 })
  price: number

  @ApiProperty({ example: 'lorem ipsum ....' })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @Validate(ExistedDestinationValidator)
  destinationId: number
}
