import { Bookings } from '@src/entities/bookings.entity';
import { Repository, EntityRepository } from 'typeorm';
@EntityRepository(Bookings)
export class BookingRepository extends Repository<Bookings> {

}
