import { Seeder, Factory } from 'typeorm-seeding';
import { Connection, getConnection } from 'typeorm';
import { Permission } from '../../entities/permission.entity';

export default class CreatePermissions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const permissions = [];
    for (let i = 1; i <= 7; i += 1) {
      for (let j = 1; j <= 5; j += 1) {
        permissions.push({ moduleId: i, methodId: j });
      }
    }
    await connection
      .createQueryBuilder()
      .insert()
      .into(Permission)
      .values(permissions)
      .execute();
  }
}
