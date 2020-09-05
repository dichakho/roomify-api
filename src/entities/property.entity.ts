import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Destination } from './destinations.entity';
import { Room } from './room.entity';

const { UPDATE, CREATE } = CrudValidationGroups;
@Entity('properties')
export class Property extends BaseEntity {
  @PrimaryColumn()
  id:number

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
  description: string

  @ApiProperty({ example: 95.37 })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column('decimal', { precision: 5, scale: 2 })
  logtitude: number

  @ApiProperty({ example: 95.37 })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column('decimal', { precision: 5, scale: 2 })
  latitude: number

  @ApiProperty({ example: '123 Nguyen Luong Bang' })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @IsString()
  @Column()
  address: string

  @Column('decimal', { nullable: true, precision: 5, scale: 2, default: 0 })
  maxPrice: number

  @Column('decimal', { nullable: true, precision: 5, scale: 2, default: 0 })
  minPrice: number

  @IsOptional()
  @IsNumber()
  destinationId: number

  @ManyToOne(()=> Destination, (destination:Destination) => destination.properties)
  destination: Destination

  @IsOptional()
  @IsNumber()
  roomId: number

  @ManyToOne(()=> Room, (room:Room) => room.property)
  rooms: Array<Room>
}
