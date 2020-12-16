import { Bookings } from '@src/entities/bookings.entity';
import { Repository, EntityRepository, In } from 'typeorm';
@EntityRepository(Bookings)
export class BookingRepository extends Repository<Bookings> {
  getBookingWithRoom(roomIds: any, limit: number, offset: number) {
    return this.createQueryBuilder('booking')
      .leftJoinAndSelect('booking.user', 'user')
      .leftJoin('booking.room', 'room')
      .where('room.id= :id', { id: In([]) })
      .take(limit)
      .skip(offset)
      .getMany();
  }

  getBookingWithUser(userId: any, limit: number, offset: number) {
    return this.createQueryBuilder('booking')
      .where('booking.userId= :userId', { userId })
      .leftJoinAndSelect('booking.room', 'room')
      .leftJoin('room.property', 'property')
      .addSelect('property.title')
      .leftJoin('property.owner', 'owner')
      .addSelect(['owner.fullName', 'owner.username', 'owner.email', 'owner.phone', 'owner.avatar'])
      .take(limit)
      .skip(offset)
      .getManyAndCount();
  }
}
