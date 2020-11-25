import { ApiProperty } from '@nestjs/swagger';
import { Amenity } from '@src/entities/amenity.entity';
import { ExistedPropertyValidator } from '@src/validators/favorite-property/existedProperty.validator';
import { IsNotEmpty, IsString, IsNumber, Validate } from 'class-validator';

export class CreateRoom {
  @ApiProperty({ example: 'Chung cu' })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ example: 95.37 })
  @IsNotEmpty()
  price: number

  @ApiProperty({ example: 95.37 })
  @IsNotEmpty()
  area: number

  @ApiProperty({ example: ['https://lh3.googleusercontent.com/50RuktOOgpl8k61d_IEbYGUvewvlrD6kzhMCzPQ19dAU589lTUKV3OecQOfRnVO2PfMZyHC2FeXfDRWY=w1080-h608-p-no-v0'] })
  images: Array<string>

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  propertyId: number

  @ApiProperty({ example: [1, 2, 3, 4] })
  amenityIds: number[]
}
