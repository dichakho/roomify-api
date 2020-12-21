import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import Faker from 'faker';
import { Destination } from '../../entities/destinations.entity';
import properties from '../data-scraping/property.json';
import rooms from '../data-scraping/rooms.json';
import { Property } from '../../entities/property.entity';
import { Policy } from '../../entities/policy.entity';

export default class CreateProperties implements Seeder {
  private latDaNang = 16;

  private longDaNang = 108;

  private latHaNoi = 21;

  private longHaNoi = 105;

  private latHCM = 10;

  private longHCM = 105;

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
        this.latDaNang += 0.003123;
        this.longDaNang += 0.003321;
        propertyData.latitude = this.latDaNang;
        propertyData.longitude = this.longDaNang;
      } else if (id < 252) {
        this.latHaNoi += 0.003456;
        this.longHaNoi += 0.003654;
        propertyData.latitude = this.latHaNoi;
        propertyData.longitude = this.longHaNoi;
      } else {
        this.latHCM += 0.003789;
        this.longHCM += 0.003987;
        propertyData.latitude = this.latHCM;
        propertyData.longitude = this.longHCM;
      }

      policy = await connection
        .createQueryBuilder()
        .insert()
        .into(Policy)
        .values({
          electricity: Faker.random.number({ min: 1000, max: 20000 }),
          water: Faker.random.number({ min: 1000, max: 20000 }),
          parking: Faker.random.number({ min: 1000, max: 10000 }),
          internet: Faker.random.number({ min: 100000, max: 500000 })
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
