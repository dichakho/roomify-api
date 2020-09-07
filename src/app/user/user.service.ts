import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { UserRepository } from './user.repository';
import { UpdateMyUser } from '@src/models/users/update-my-user.model';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(private readonly repository: UserRepository) {
    super(repository);
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    const result = await this.repository.findOne({
      where: { username },
      relations: ['roles']
    });
    return result;
  }

  async updateMyInformation(user: User, userUpdate: UpdateMyUser): Promise<User> {
    const data: any = user;
    data.permissions = undefined;
    if(userUpdate.phone !== undefined) {
      data.phone = userUpdate.phone;
    }
    if(userUpdate.fullName !== undefined) {
      data.fullName = userUpdate.fullName;
    }
    if(userUpdate.email !== undefined) {
      data.email = userUpdate.email;
    }
    if(userUpdate.avatar !== undefined) {
      data.avatar = userUpdate.avatar;
    }
    const result = await this.repository.save(data);
    return result;
  }
}
