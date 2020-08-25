import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Method } from '../../entities/method.entity';

export default class CreateMethods implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const methods = [
      { name: 'GET', description: 'Retrieve object' },
      { name: 'POST', description: 'Create object' },
      { name: 'PUT', description: 'Replace object' },
      { name: 'DELETE', description: 'Delete object' },
      { name: 'PATCH', description: 'Update object' }
    ];
    await connection
      .createQueryBuilder()
      .insert()
      .into(Method)
      .values(methods)
      .execute();
  }
}
