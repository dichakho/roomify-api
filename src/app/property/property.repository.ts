import { RoomStatus } from '@src/common/enums/roomStatus.enum';
import { Property } from '@src/entities/property.entity';
import { Repository, EntityRepository, getManager } from 'typeorm';
@EntityRepository(Property)
export class PropertyRepository extends Repository<Property> {
  getOneWithRoom(id: number): any {
    return getManager().createQueryBuilder(Property, 'property').where('property.id= :id', { id })
      .leftJoinAndSelect('property.rooms', 'rooms').leftJoinAndSelect('rooms.amenities', 'amenities')
      .andWhere('rooms.status= :status', { status: RoomStatus.OPEN }).getOne();
  }

  getPropertyWithSubDistrict(name: string, limit: number, offset: number): any {
    return getManager().createQueryBuilder(Property, 'property')
      .leftJoinAndSelect('property.destination', 'destination')
      .where('destination.name= :name', { name }).take(limit).skip(offset).orderBy('property.id', 'DESC').getManyAndCount();
  }

  getPropertyNearMe() {
    
  }
}
