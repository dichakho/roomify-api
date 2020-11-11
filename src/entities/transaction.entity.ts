import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Bookings } from './bookings.entity';

const { UPDATE, CREATE } = CrudValidationGroups;

@Entity('transactions')
export class Transaction extends BaseEntity {
  @ApiProperty({ example: false })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column()
  isPaid: boolean

  @ApiProperty({ readOnly: true })
  @OneToMany(() => Bookings, (booking: Bookings) => booking.transaction)
  bookings: Bookings[]
}
