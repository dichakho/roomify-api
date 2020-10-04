import { Injectable, BadRequestException } from '@nestjs/common';
import { UpdateMyUserDto } from '@src/models/users/update-my-user.dto';
import { BaseService } from '@src/base.service';
import { UserRequestDto } from '@src/models/users/user-request.dto';
import { UpdateMyPasswordDto } from '@src/models/users/update-my-password.dto';
import { User } from '../../entities/user.entity';
import { UserRepository } from './user.repository';
import Bcrypt from '../../plugins/bcrypt.plugin';

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

  async findOneByPhone(phone: string): Promise<User | undefined> {
    const result = await this.repository.findOne({
      where: { phone },
      relations: ['roles']
    });
    return result;
  }

  async updateMyInformation(user: User, userUpdate: UpdateMyUserDto): Promise<User> {
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

  async updateAvatar(path: string, req: UserRequestDto): Promise<any> {
    const avatar = await this.uploadImage(path, req.user.fullName);
    await this.repository.update({ id: req.user.id }, { avatar });
    return {
      avatar
    };
  }

  async updateMyPassword(id: number, body: UpdateMyPasswordDto) {
    const user = await this.repository.findOne({
      select: ['password'],
      where: {
        id
      }
    });
    if (!Bcrypt.compareSync(body.oldPassword, user.password)) throw new BadRequestException('Old password is incorrect');
    await this.repository.update(id, { password: body.newPassword });
  }

}
