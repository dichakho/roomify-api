import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Bookings } from './bookings.entity';

@Entity('transactions')
export class Transaction extends BaseEntity {
  @Column()
  isPaid: boolean

  @OneToMany(() => Bookings, (booking: Bookings) => booking.transaction)
  bookings: Bookings[]
}
