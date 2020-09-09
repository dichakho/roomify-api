/* eslint-disable @typescript-eslint/no-unused-vars */
import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { enumToArray } from '../../utils/helper';
import { User } from '../../entities/user.entity';
import { UserStatus } from '../../common/enums/userStatus.enum';

define(User, (faker: typeof Faker, context: { roles: string[] }) => {
  const fullName = faker.name.findName();
  const username = faker.internet.userName();
  const email = faker.internet.email(username);
  const password = faker.internet.password();
  const phoneNumber = faker.phone.phoneNumber();
  const avatar = faker.image.avatar();
  const status = faker.random.arrayElement(enumToArray(UserStatus));
  const roleIds = faker.random.number({ min: 2, max: 4 });

  const user = new User();
  user.fullName = fullName;
  user.username = username;
  user.email = email;
  user.password = password;
  user.phone = phoneNumber;
  user.avatar = avatar;
  user.status = status;
  user.roleIds = [roleIds];

  return user;
});
