import { Injectable } from '@nestjs/common';
import { BaseService } from '@src/base.service';
import { Room } from '@src/entities/room.entity';
import { RoomRepository } from './room.repository';

@Injectable()
export class RoomService extends BaseService<Room, RoomRepository> {
  constructor(protected repository: RoomRepository) {
    super(repository);
  }
}
