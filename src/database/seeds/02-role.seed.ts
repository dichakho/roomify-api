import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Role } from '../../entities/roles.entity';

export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const admin = {
      name: 'ADMIN',
      description: 'Admin has all the permissions'
    };
    const manager = {
      name: 'MANAGER',
      description: 'manage goods'
    };
    const reviewer = {
      name: 'REVIEWER',
      description: 'review order'
    };
    const user = {
      name: 'USER',
      description: 'user'
    };
    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([admin, manager, reviewer, user])
      .execute();
  }
}
