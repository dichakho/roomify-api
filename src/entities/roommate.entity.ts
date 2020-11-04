import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

const { UPDATE, CREATE } = CrudValidationGroups;

@Entity('roommate')
export class Roommate extends BaseEntity {
  @ApiProperty({ example: 95.111 })
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @IsNumber()
  @Column('decimal', { precision: 5, scale: 2 })
  price: number

  @ApiProperty({ readOnly: true })
  @ManyToOne(() => User, (user: User) => user.roommates)
  user: User
}
