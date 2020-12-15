import { Bookings } from '@src/entities/bookings.entity';
import { Repository, EntityRepository, In } from 'typeorm';
@EntityRepository(Bookings)
export class BookingRepository extends Repository<Bookings> {
  getBookingWithRoom(roomIds: any, limit: number, offset: number) {
    return this.createQueryBuilder('booking')
      .leftJoin('booking.user', 'user')
      .leftJoin('booking.room', 'room')
      .where('room.id= :id', { id: In((roomIds.length > 0 ? roomIds : [0])) })
      .take(limit)
      .skip(offset).getMany();
  }
}
