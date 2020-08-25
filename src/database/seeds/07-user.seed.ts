import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../../entities/user.entity';
import Bcrypt from '../../plugins/bcrypt.plugin';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const hashPwd: string = await Bcrypt.hash('123456');
    const admin = {
      fullName: 'Admin',
      username: 'admin',
      email: 'admin@gmail.com',
      password: hashPwd,
      phone: '0981234899',
      avatar:
        'https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png',
      status: 'ACTIVE'
    };
    const manager = {
      fullName: 'Manager',
      username: 'manager',
      email: 'manager@gmail.com',
      password: hashPwd,
      phone: '0981234888',
      avatar:
        'https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png',
      status: 'ACTIVE'
    };
    const reviewer = {
      fullName: 'Reviewer',
      username: 'reviewer',
      email: 'reviewer@gmail.com',
      password: hashPwd,
      phone: '0981234777',
      avatar:
        'https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png',
      status: 'ACTIVE'
    };
    const user = {
      fullName: 'User',
      username: 'user',
      email: 'user@gmail.com',
      password: hashPwd,
      phone: '0981234789',
      avatar:
        'https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png',
      status: 'ACTIVE'
    };
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([admin, manager, reviewer, user])
      .execute();

    await factory(User)().createMany(10);
  }
}
