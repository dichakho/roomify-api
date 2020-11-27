import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class CreateUserRoles implements Seeder {
  public async run(factory: Factory, connection: Connection) {
    const userRoles = [
      { usersId: 1, rolesId: 1 },
      { usersId: 2, rolesId: 2 },
      { usersId: 3, rolesId: 3 },
      { usersId: 4, rolesId: 4 },
      { usersId: 5, rolesId: 2 },
      { usersId: 6, rolesId: 3 },
      { usersId: 7, rolesId: 4 },
      { usersId: 8, rolesId: 2 },
      { usersId: 9, rolesId: 4 },
      { usersId: 10, rolesId: 4 },
      { usersId: 11, rolesId: 3 },
      { usersId: 12, rolesId: 4 },
      { usersId: 13, rolesId: 2 },
      { usersId: 14, rolesId: 4 }
    ];

    await connection
      .createQueryBuilder()
      .insert()
      .into('user_role')
      .values(userRoles)
      .execute();
  }
}
