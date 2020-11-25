import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '@src/base.service';
import { RoomStatus } from '@src/common/enums/roomStatus.enum';
import { Room } from '@src/entities/room.entity';
import { RoomRepository } from './room.repository';

@Injectable()
export class RoomService extends BaseService<Room, RoomRepository> {
  constructor(protected repository: RoomRepository) {
    super(repository);
  }

  async getOneRoom(id: number): Promise<Room> {
    const room = await this.repository.findOne({where: {id, status: RoomStatus.OPEN}, relations: ['amenities']});
    if(!room) throw new NotFoundException('Room not found !!!');
    return room;
  }
}
