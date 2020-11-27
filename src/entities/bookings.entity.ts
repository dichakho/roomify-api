import { Entity, ManyToOne } from 'typeorm';
import { Room } from './room.entity';
import { Transaction } from './transaction.entity';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('bookings')
export class Bookings extends BaseEntity {
  @ManyToOne(()=> User, (user: User) => user.bookings)
  user: User

  @ApiProperty({ readOnly: true })
  @ManyToOne(() => Room, (room: Room) => room.bookings)
  room: Room

  @ApiProperty({ readOnly: true })
  @ManyToOne(() => Transaction, (transaction: Transaction) => transaction.bookings)
  transaction: Transaction
}
