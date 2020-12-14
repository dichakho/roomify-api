import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import Faker from 'faker';
import properties from '../data-scraping/property.json';
import rooms from '../data-scraping/rooms.json';
import amenities_data from '../data-scraping/amenities.json';
import { Room } from '../../entities/room.entity';
import { User } from '../../entities/user.entity';

export default class CreateRooms implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const users = await connection
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoin('user.roles', 'roles')
      .where('roles.id = :id', { id: 4 })
      .getMany();
    
    for (let i = 0; i < users.length; i++) {
      await connection
      .createQueryBuilder()
      .insert()
      .into('owner_registration')
      .values({IDNumber: '123456789', nameOwner: users[i].fullName, householdRegistrationImgs: ['https://www.tienland.vn/media/ar/cach-xem-so-do.jpg'], user: users[i]})
      .execute();
    }
  }
}
