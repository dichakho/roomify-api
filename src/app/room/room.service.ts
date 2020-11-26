import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '@src/base.service';
import { RoomStatus } from '@src/common/enums/roomStatus.enum';
import { Room } from '@src/entities/room.entity';
import { CreateRoom } from '@src/models/room/create.dto';
import { UpdateRoom } from '@src/models/room/update.dto';
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

  async createRoom(data: CreateRoom, userId: number): Promise<Room> {
    const property = await this.propertyRepository.findOne({ where: { id: data.propertyId }, relations: ['rooms', 'owner'] });
    if (!property) throw new NotFoundException('Property not found');
    if (userId !== property.owner.id) throw new ForbiddenException("Can't create room of property's others");
    const amenities = await this.amenityRepository.findByIds(data.amenityIds);
    const room = this.repository.create();
    room.name = data.name;
    room.price = data.price;
    room.status = 'OPEN';
    room.area = data.area;
    room.images = data.images;
    room.amenities = amenities;
    room.property = property;
    const result = await this.repository.save(room);
    const tempProperty = this.propertyRepository.create();
    tempProperty.id = property.id;
    result.property = tempProperty;
    return result;
  }

  async updateRoom(data: UpdateRoom, id: number): Promise<Room> {
    console.log('data --------->', data);
    const room = await this.repository.findOne({ where: { id }, relations: ['property', 'property.rooms'] });
    if(data.amenityIds) {
      const amenities = await this.amenityRepository.findByIds(data.amenityIds);
      room.amenities = amenities;
    }
    if(data.area) room.area = data.area;
    if(data.images) room.images = data.images;
    if(data.name) room.name = data.name;
    if(data.price) room.price = data.price;
    if(data.status) room.status = data.status;
    const result = await this.repository.save(room);
    result.property = undefined;
    return result;
  }
}
