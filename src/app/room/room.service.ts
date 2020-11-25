import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '@src/base.service';
import { RoomStatus } from '@src/common/enums/roomStatus.enum';
import { Room } from '@src/entities/room.entity';
import { CreateRoom } from '@src/models/room/create.dto';
import { AmenityRepository } from '../amenity/amenity.repository';
import { PropertyRepository } from '../property/property.repository';
import { RoomRepository } from './room.repository';

@Injectable()
export class RoomService extends BaseService<Room, RoomRepository> {
  constructor(protected repository: RoomRepository, private readonly amenityRepository: AmenityRepository, private readonly propertyRepository: PropertyRepository) {
    super(repository);
  }

  async getOneRoom(id: number): Promise<Room> {
    const room = await this.repository.findOne({ where: { id, status: RoomStatus.OPEN }, relations: ['amenities'] });
    if (!room) throw new NotFoundException('Room not found !!!');
    return room;
  }

  async createRoom(data: CreateRoom) {
    const property = await this.propertyRepository.findOne({ where: { id: data.propertyId }, relations: ['rooms'] });
    if (!property) throw new NotFoundException('Property not found');
    const amenities = await this.amenityRepository.findByIds(data.amenityIds);
    const room = this.repository.create();
    room.name = data.name;
    room.price = data.price;
    room.status = 'OPEN';
    room.area = data.area;
    room.images = data.images;
    room.amenities = amenities;
    const result = await this.repository.save({ ...room, property: { id: data.propertyId } });
    if (property.maxPrice < result.price) property.maxPrice = result.price;
    if (property.minPrice > result.price) property.minPrice = result.price;
    const count = property.rooms.length;
    const tinh = (property.averagePrice * count + result.price) / (count + 1);
    property.averagePrice = tinh;
    property.averageArea = (property.averageArea * count + result.area) / (count + 1);
    await this.propertyRepository.save(property);
    return result;
  }
}
