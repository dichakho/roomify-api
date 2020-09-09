import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateMyUser } from '@src/models/users/update-my-user.model';
import { BaseService } from '@src/base.service';
import { User } from '../../entities/user.entity';
import { UserRepository } from './user.repository';
import { UserRequest } from '@src/models/users/user-request.model';

@Injectable()
export class UserService extends BaseService<User, UserRepository> {

  constructor(protected repository: UserRepository) {
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
    if (userUpdate.phone !== undefined) {
      data.phone = userUpdate.phone;
    }
    if (userUpdate.fullName !== undefined) {
      data.fullName = userUpdate.fullName;
    }
    if (userUpdate.email !== undefined) {
      data.email = userUpdate.email;
    }
    if (userUpdate.avatar !== undefined) {
      data.avatar = userUpdate.avatar;
    }
    const result = await this.repository.save(data);
    return result;
  }

  async updateAvatar(path: string, req: UserRequest): Promise<any> {
    try {
      const avatar = await this.uploadImage(path, req.user.fullName);
      const result = await this.repository.update({ id: req.user.id }, { avatar });
      return {
        avatar
      };
    } catch (error) {
      console.log('UPDATE_AVATAR_USER_SERVICE', error);
      throw new InternalServerErrorException();
    }
  }
}
