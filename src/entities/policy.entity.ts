import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Property } from './property.entity';

const { UPDATE, CREATE } = CrudValidationGroups;

@Entity('policies')
export class Policy extends BaseEntity {

  @ApiProperty()
  @IsNumber()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column('decimal', { precision: 5, scale: 2 })
  electricity: number

  @ApiProperty()
  @IsNumber()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column('decimal', { precision: 5, scale: 2 })
  water: number

  @ApiProperty()
  @IsNumber()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column('decimal', { precision: 5, scale: 2 })
  parking: number

  @ApiProperty()
  @IsNumber()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column('decimal', { precision: 5, scale: 2 })
  internet: number

  @OneToOne(() => Property, (property: Property) => property.policy)
  property: Property
}
