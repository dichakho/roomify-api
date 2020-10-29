import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

const { UPDATE, CREATE } = CrudValidationGroups;

@Entity('policies')
export class Policy extends BaseEntity {
  @ApiProperty({ example: 'tien dien' })
  @IsString()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column()
  name: string

  @ApiProperty({ example: 'icon-name' })
  @IsString()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column()
  iconName: string

}
