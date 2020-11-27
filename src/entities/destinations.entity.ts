import { IsOptional, IsNotEmpty, IsString, IsNumber, IsEmpty } from 'class-validator';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn, Tree, TreeChildren, TreeParent } from 'typeorm';
import { CrudValidationGroups } from '@nestjsx/crud';
import { ApiProperty } from '@nestjs/swagger';
import { Property } from './property.entity';
import { TreeBase } from './treebase.entity';

const { UPDATE, CREATE } = CrudValidationGroups;

@Entity('destinations')
@Tree('materialized-path')
export class Destination extends TreeBase {
  @ApiProperty({ example: 'destination1' })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString()
  @Column()
  name: string;

  // @ApiProperty({ example: 1 })
  // @IsOptional({ groups: [UPDATE] })
  // @IsNotEmpty({ groups: [CREATE] })
  // @Column()
  // status: number;

  @IsOptional()
  @IsEmpty()
  @TreeParent()
  parent: Destination;

  @IsOptional()
  @IsEmpty()
  @TreeChildren()
  child: Destination[];

  @ApiProperty({ readOnly: true })
  @IsOptional()
  @IsNumber({}, { each: true })
  propertyId: Array<number>;

  @ApiProperty({ readOnly: true })
  @OneToMany(() => Property, (property: Property) => property.description)
  @JoinColumn({ name: 'propertyId' })
  properties: Array<Property>
}
