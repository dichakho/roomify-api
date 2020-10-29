import { Entity, ManyToOne } from 'typeorm';
import { Room } from './room.entity';
import { Transaction } from './transaction.entity';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('bookings')
export class Bookings extends BaseEntity {
  @ManyToOne(()=> User, (user: User) => user.bookings)
  user: User

  @ManyToOne(() => Room, (room: Room) => room.bookings)
  room: Room

  @ManyToOne(() => Transaction, (transaction: Transaction) => transaction.bookings)
  transaction: Transaction
}
