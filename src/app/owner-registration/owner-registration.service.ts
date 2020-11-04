import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { BaseService } from '@src/base.service';
import { OwnerRegistration } from '@src/entities/owner_registration.entity';
import { CreateOwnerRegistrationDto } from '@src/models/owner-registration/create.dto';
import { UpdateOwnerRegistrationDto } from '@src/models/owner-registration/update.dto';
import { OwnerRegistrationRepository } from './owner-registration.repository';
import { OwnerStatus } from '../../common/enums/ownerStatus.enum';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class OwnerRegistrationService extends BaseService<OwnerRegistration, OwnerRegistrationRepository> {
  constructor(protected repository: OwnerRegistrationRepository, private readonly userRepo: UserRepository) {
    super(repository);
  }

  async create(data: CreateOwnerRegistrationDto) {
    try {
      const result = await this.repository.save(data);
      return result;
    } catch (error) {
      console.log('CATCH ---->', error);
      if (error.code === '23503') throw new NotFoundException('User not found');
      if (error.code === '23505') throw new BadRequestException('User has sent request to adminstrator');
      throw new InternalServerErrorException();
    }
  }

  async delete(id: number) {
    const query = await this.repository.findOne({ where: { id }, relations: ['user'] });
    if (!query) throw new NotFoundException('Request owner not found');
    await this.repository.delete(id);
    if (query.status === OwnerStatus.ACCEPT) {
      const userQuery = await this.userRepo.findOne({ where: { id: query.user.id }, relations: ['roles'] });
      console.log('user_query --->', userQuery);
      for (let i = 0; i < userQuery.roles.length; i += 1) {
        if (userQuery.roles[i].name === 'OWNER') {
          userQuery.roles[i] = undefined;
          break;
        }
      }
      const result = await this.userRepo.save(userQuery);
      console.log('result ---->', result);
    }
  }

  async update(id: number, data: UpdateOwnerRegistrationDto) {
    const query = await this.repository.findOne({ where: { id }, relations: ['user'] });
    if (!query) throw new NotFoundException('Request owner not found');
    // if(data.IDNumber) query.IDNumber = data.IDNumber;
    if (data.status !== undefined && data.status === OwnerStatus.PENDING && query.status === OwnerStatus.ACCEPT) throw new ForbiddenException('Can not edit request was ACCEPT')
    if (data.status !== undefined && data.status === OwnerStatus.ACCEPT) {
      query.status = data.status;
      const userQuery = await this.userRepo.findOne({ where: { id: query.user.id }, relations: ['roles'] });
      const roleId = [];
      roleId.push({ id: 3 });
      userQuery.roles.forEach(role => {
        roleId.push({ id: role.id });
      });
      const result = await this.repository.save(query);
      await this.userRepo.save({ ...userQuery, roles: roleId });
      return result;
    }
    return query;
  }
}
