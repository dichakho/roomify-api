import { Column, Entity, ManyToOne } from 'typeorm';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { RoomStatus } from '../common/enums/roomStatus.enum';
import { enumToArray } from '../utils/helper';
import { Property } from './property.entity';
import { BaseEntity } from './base.entity';

const { UPDATE, CREATE } = CrudValidationGroups;
@Entity('rooms')
export class Room extends BaseEntity {
  @ApiProperty({ example: 'Chung cu' })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @IsString()
  @Column()
  name: string

  @ApiProperty({ example: 'Lorem idolt ...' })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @IsString()
  @Column()
  slug: string

  @ApiProperty({ example: 95.37 })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column('decimal', { precision: 5, scale: 2 })
  price: number

  @ApiProperty({ example: 95.37 })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column('decimal', { precision: 5, scale: 2 })
  area: number

  @ApiProperty({ example: ['https://lh3.googleusercontent.com/50RuktOOgpl8k61d_IEbYGUvewvlrD6kzhMCzPQ19dAU589lTUKV3OecQOfRnVO2PfMZyHC2FeXfDRWY=w1080-h608-p-no-v0'] })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column('text', { array: true })
  images: Array<string>

  @ApiProperty({ example: 'OPEN' })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsIn(enumToArray(RoomStatus))
  @Column({
    type: 'enum',
    enum: RoomStatus,
    default: RoomStatus.OPEN
  })
  status: string;

  @IsOptional()
  @IsNumber()
  propertyId: number

  @ManyToOne(() => Property, (property: Property) => property.rooms)
  property: Property

}
