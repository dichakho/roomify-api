import { RoomStatus } from '@src/common/enums/roomStatus.enum';
import { Property } from '@src/entities/property.entity';
import { Repository, EntityRepository, getManager } from 'typeorm';
@EntityRepository(Property)
export class PropertyRepository extends Repository<Property> {
  getOneWithRoom(id: number): any {
    return getManager().createQueryBuilder(Property, 'property').where('property.id= :id', { id })
      .leftJoinAndSelect('property.rooms', 'rooms').andWhere('rooms.status= :status', { status: RoomStatus.OPEN }).getOne();
  }
}
