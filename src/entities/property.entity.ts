import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Destination } from './destinations.entity';
import { Room } from './room.entity';
import { Category } from './category.entity';
import { Amenity } from './amenity.entity';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';
import { Policy } from './policy.entity';

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
  @IsNumber()
  @Column('decimal', { precision: 5, scale: 2 })
  logtitude: number

  @ApiProperty({ example: 95.37 })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsNumber()
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

  @ApiProperty({ readOnly: true })
  @IsEmpty()
  @Column('decimal', { nullable: true, precision: 5, scale: 2, default: 0 })
  maxPrice: number

  @ApiProperty({ readOnly: true })
  @IsEmpty()
  @Column('decimal', { nullable: true, precision: 5, scale: 2, default: 0 })
  minPrice: number

  @ApiProperty({ readOnly: true })
  @IsOptional()
  @IsNumber()
  @JoinColumn()
  destinationId: number

  @ApiProperty({ example: { id: 1 } })
  @ManyToOne(() => Destination, (destination: Destination) => destination.properties)
  destination: Destination

  @ApiProperty({ readOnly: true })
  @OneToMany(() => Room, (room: Room) => room.property)
  rooms: Array<Room>

  @ApiProperty({ example: { id: 1 } })
  @ManyToOne(() => Category, (category: Category) => category.properties)
  category: Category

  @ApiProperty({ readOnly: true })
  @IsOptional()
  @IsNumber()
  @JoinColumn()
  categoryId: number

  @ApiProperty({ readOnly: true })
  @IsOptional()
  @IsNumber()
  @JoinColumn()
  ownerId: number

  @ManyToOne(() => User, (owner: User) => owner.properties)
  @JoinTable()
  owner: User

  @OneToOne(() => Policy, (policy: Policy) => policy.property)
  policy: Policy
}
