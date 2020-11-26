import { InsertEvent, EventSubscriber, EntitySubscriberInterface, getConnection } from 'typeorm';
import { Property } from '../property.entity';
import { Room } from '../room.entity';

@EventSubscriber()
export class RoomSubscriber implements EntitySubscriberInterface<Room> {

  /**
     * Indicates that this subscriber only listen to Post events.
     */
  listenTo(): any {
    return Room;
  }

  /**
     * Called before post insertion.
     */
  async afterInsert(event: InsertEvent<Room>): Promise<void> {
    console.log(event.entity);
    const { property } = event.entity;
    if (property.maxPrice < event.entity.price) property.maxPrice = event.entity.price;
    if (property.minPrice > event.entity.price) property.minPrice = event.entity.price;
    const count = property.rooms.length;
    const tinh = (property.averagePrice * count + event.entity.price) / (count + 1);
    property.averagePrice = tinh;
    property.averageArea = (property.averageArea * count + event.entity.area) / (count + 1);
    await getConnection()
      .createQueryBuilder()
      .update(Property)
      .set({ averageArea: property.averageArea, averagePrice: property.averagePrice, minPrice: property.minPrice, maxPrice: property.maxPrice })
      .where('id = :id', { id: property.id })
      .execute();
  }

  async beforeUpdate(event: InsertEvent<Room>): Promise<void> {

  }
}
