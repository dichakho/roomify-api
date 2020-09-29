import { IsOptional, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { CrudValidationGroups } from '@nestjsx/crud';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';
import { Property } from './property.entity';

const { UPDATE, CREATE } = CrudValidationGroups;

@Entity('destinations')
export class Destination extends BaseEntity {
  @ApiProperty({ example: 'destination1' })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString()
  @Column()
  name: string;

  @ApiProperty({ example: 95.37 })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column('decimal', { precision: 5, scale: 2 })
  status: number;

  @IsOptional()
  @ApiProperty({ example: 4 })
  @IsNumber({}, { each: true })
  parentId: number;

  @IsOptional()
  @ApiProperty({ example: [2, 3] })
  @IsNumber({}, { each: true })
  childId: Array<number>;

  @ManyToOne(
    type => Destination,
    destination => destination.child
  )
  @JoinColumn({ name: 'parentId' })
  parent: Destination;

  @OneToMany(
    type => Destination,
    destination => destination.parent
  )
  @JoinColumn({ name: 'childId' })
  child: Destination[];

  @IsOptional()
  @IsNumber({}, { each: true })
  propertyId: Array<number>;

  @OneToMany(() => Property, (property: Property) => property.description)
  @JoinColumn({ name: 'propertyId' })
  properties: Array<Property>
}
