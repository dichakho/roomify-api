import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Destination } from './destinations.entity';
import { Room } from './room.entity';
import { Category } from './category.entity';
import { Amenity } from './amenity.entity';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

const { UPDATE, CREATE } = CrudValidationGroups;
@Entity('properties')
export class Property extends BaseEntity {
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
  @Column('text')
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

  @ApiProperty({ example: 'https://c8.alamy.com/comp/JX2THD/residential-building-beauty-cottage-devon-rural-scene-thatched-roof-JX2THD.jpg' })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @IsString()
  @Column({ default: 'https://c8.alamy.com/comp/JX2THD/residential-building-beauty-cottage-devon-rural-scene-thatched-roof-JX2THD.jpg' })
  thumbnail: string

  @Column('decimal', { nullable: true, precision: 5, scale: 2, default: 0 })
  maxPrice: number

  @Column('decimal', { nullable: true, precision: 5, scale: 2, default: 0 })
  minPrice: number

  @IsOptional()
  @IsNumber()
  @JoinColumn()
  destinationId: number

  @ManyToOne(() => Destination, (destination: Destination) => destination.properties)
  destination: Destination

  @OneToMany(() => Room, (room: Room) => room.property)
  rooms: Array<Room>

  @ManyToOne(() => Category, (category: Category) => category.properties)
  category: Category

  @IsOptional()
  @IsNumber()
  @JoinColumn()
  categoryId: number

  @IsOptional()
  @IsNumber()
  @JoinColumn()
  ownerId: number

  @ManyToOne(() => User, (user: User) => user.properties)
  @JoinTable({ name: 'ownerId' })
  owner: User
}
