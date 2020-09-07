import { User } from '@src/entities/user.entity';
import { Repository, EntityRepository } from 'typeorm';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findOneById(id: number): Promise<User> {
    return this.findOne(id);
  }

}
