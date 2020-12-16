import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '@src/base.service';
import { Bookings } from '@src/entities/bookings.entity';
import { Property } from '@src/entities/property.entity';
import { GetMany } from '@src/models/base/getMany.dto';
import { IResponseFormat } from '@src/models/base/response.interface';
import admin from 'firebase-admin';
import { In } from 'typeorm';
import { RoomRepository } from '../room/room.repository';
import { BookingRepository } from './booking.respository';

@Injectable()
export class BookingService extends BaseService<Bookings, BookingRepository> {
  constructor(
    protected readonly repository: BookingRepository,
    private readonly roomRepository: RoomRepository
  ) {
    super(repository);
  }

  async create(userId: number, roomId: number, phone: string): Promise<IResponseFormat<Bookings>> {
    const checkRoom = await this.roomRepository.findOne(roomId);
    if (!checkRoom) throw new NotFoundException('Room not found !!!');
    const query = await this.repository.findOne({
      where: { roomId, userId, transactionId: null, isChecked: false },
      order: { updatedAt: 'DESC' }
    });
    if (query) {
      const date = new Date();
      if (
        date.getFullYear() === query.updatedAt.getFullYear() &&
        date.getMonth() === query.updatedAt.getMonth() &&
        date.getDay() - query.updatedAt.getDay() < 2
      ) {
        const time =
          date.getHours() -
          query.updatedAt.getHours() +
          (date.getDay() - query.updatedAt.getDay()) * 24;
        if (time < 24)
          throw new ForbiddenException(
            `You was booked this property. Please wait for ${24 - time}h to book again`
          );
      }

      const data = await this.repository.save({ id: query.id, updatedAt: date });
      return { data };
    }

    const data = await this.repository.save({ user: { id: userId }, room: { id: roomId } });
    admin
      .messaging()
      .sendToTopic(roomId.toString(), {
        data: {
          content: `User with phone: ${phone} booked your room !!! Please contact with him/her`
        }
      })
      .then(response => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
      })
      .catch(error => {
        console.log('Error sending message:', error);
      });

    return { data };
  }

  async getBookingWithOwner(ownerId: number, query: GetMany) {
    const rooms = await this.roomRepository.findRoomWithOwner(ownerId);
    const roomIds = [];
    for (let i = 0; i < rooms.length; i += 1) {
      roomIds.push(rooms[i].id);
    };
    const temp = await this.getManyData(query, ['user', 'room'], { roomId: In((roomIds.length > 0 ? roomIds : [0])) });
    const data = temp.result[0];
    const count = data.length;
    const total = temp.result[1];
    const pageCount = Math.ceil(total / temp.limit);
    return {
      count,
      total,
      page: temp.page,
      pageCount,
      data
    };
  }

  async getBookingWithUser(userId: number, query: GetMany) {
    let { limit, page, offset } = query;
    if (limit === undefined) limit = 15;
    if (offset === undefined) offset = 0;
    if (page === undefined && offset === undefined) {
      offset = 0;
      page = 1;
    }
    else if (offset === undefined) {
      offset = limit * (page - 1);
    }
    else {
      page = Math.trunc(offset / limit) + 1;
    }
    const temp = await this.repository.getBookingWithUser(userId, limit, offset);
    const data = temp[0];
    const count = data.length;
    const total = temp[1];
    const pageCount = Math.ceil(total / limit);
    return {
      count,
      total,
      page,
      pageCount,
      data
    };
  }
}
