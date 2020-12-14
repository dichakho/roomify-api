import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import Faker from 'faker';
import { Destination } from '../../entities/destinations.entity';
import properties from '../data-scraping/property.json';
import rooms from '../data-scraping/rooms.json';
import { Property } from '../../entities/property.entity';
import { Policy } from '../../entities/policy.entity';

export default class CreateProperties implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const destination = await connection
      .getRepository(Destination)
      .createQueryBuilder('destination')
      .where('destination.name = :name', { name: 'Hòa Phát' })
      .getOne();
    let { id } = destination;
    let temp = 'Hòa Phát';
    let propertyData;
    let policy;
    for (let i = 0; i < properties.length; i += 1) {
      if (temp !== properties[i].destination.name) {
        id += 1;
        temp = properties[i].destination.name;
      }
      propertyData = properties[i];
      propertyData.destination.id = id;
      propertyData.address = '123 Nguyễn Lương Bằng';
      propertyData.category = { id: Faker.random.number({ min: 1, max: 4 }) };
      propertyData.owner = { id: 3 };
      rooms.push(propertyData.rooms);
      propertyData.averagePrice = properties[i].rooms.price * 20000;
      propertyData.rooms = undefined;
      propertyData.description = Faker.lorem.sentences(4);
      propertyData.averageArea = 100.97;
      if (id < 86) {
        propertyData.latitude = Faker.random.number({ min: 16, max: 17, precision: 0.000001 });
        propertyData.longitude = Faker.random.number({ min: 108, max: 109, precision: 0.000001 });
      } else if (id < 252) {
        propertyData.latitude = Faker.random.number({ min: 21, max: 22, precision: 0.000001 });
        propertyData.longtitude = Faker.random.number({
          min: 105,
          max: 106,
          precision: 0.000001
        });
      } else {
        propertyData.latitude = Faker.random.number({ min: 10, max: 11, precision: 0.000001 });
        propertyData.longtitude = Faker.random.number({
          min: 105,
          max: 106,
          precision: 0.000001
        });
      }

      policy = await connection
        .createQueryBuilder()
        .insert()
        .into(Policy)
        .values({
          electricity: Faker.random.number({ min: 10, max: 100 }),
          water: Faker.random.number({ min: 10, max: 100 }),
          parking: Faker.random.number({ min: 1, max: 10 }),
          internet: Faker.random.number({ min: 10, max: 100 })
        })
        .execute();

      propertyData.policy = { id: policy.raw[0].id };

      await connection
        .createQueryBuilder()
        .insert()
        .into(Property)
        .values(propertyData)
        .execute();
    }
  }
}
