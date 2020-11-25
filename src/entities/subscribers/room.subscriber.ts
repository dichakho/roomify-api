import { InsertEvent, EventSubscriber, EntitySubscriberInterface } from 'typeorm';
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
  async beforeInsert(event: InsertEvent<Room>): Promise<void> {

  }

  async beforeUpdate(event: InsertEvent<Room>): Promise<void> {

  }
}
