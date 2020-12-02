import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '@src/base.service';
import { Bookings } from '@src/entities/bookings.entity';
import { IResponseFormat } from '@src/models/base/response.interface';
import { RoomRepository } from '../room/room.repository';
import { BookingRepository } from './booking.respository';

@Injectable()
export class BookingService extends BaseService<Bookings, BookingRepository> {
  constructor(protected readonly repository: BookingRepository, private readonly roomRepository: RoomRepository) {
    super(repository);
  }

  async create(userId: number, roomId: number): Promise<IResponseFormat<Bookings>> {
    const checkRoom = await this.roomRepository.findOne(roomId);
    if (!checkRoom) throw new NotFoundException('Room not found !!!');
    const query = await this.repository.findOne({ where: { roomId, userId, transactionId: null, isChecked: false }, order: { updatedAt: 'DESC' } });
    if (query) {
      const date = new Date();
      if (date.getFullYear() === query.updatedAt.getFullYear() && date.getMonth() === query.updatedAt.getMonth() && date.getDay() - query.updatedAt.getDay() < 2) {
        const time = (date.getHours() - query.updatedAt.getHours()) + (date.getDay() - query.updatedAt.getDay()) * 24;
        if (time < 24) throw new ForbiddenException(`You was booked this property. Please wait for ${24 - time}h to book again`);
      }

      const data = await this.repository.save({ id: query.id, updatedAt: date });
      return { data };

    }

    const data = await this.repository.save({ user: { id: userId }, room: { id: roomId } });
    return { data };

  }
}
