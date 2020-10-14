import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '@src/base.service';
import { UserPermission } from '@src/entities/user-permission.entity';
import { AddDeletePermissions } from '@src/models/user-permissions/permission.dto';
import { UserRepository } from '../user/user.repository';
import { UserPermissionRepository } from './user-permission.repository';

@Injectable()
export class UserPermissionService extends BaseService<UserPermission, UserPermissionRepository>{
  constructor(protected repository: UserPermissionRepository, private readonly userRepository: UserRepository) {
    super(repository);
  }

  async deleteMany(dto: any) {
    const { data } = dto;
    let promise;
    const queries = await this.repository.find({ where: { user: data[0].user, status: 'ADD' }, relations: ['permission'] });
    console.log('QUERY ---->', queries);
    data.map(async (d: UserPermission) => {
      if (queries.length > 0) {
        promise = new Promise((resolve, reject) => {
          for (let i = 0; i < queries.length; i += 1) {
            if (queries[i].permission.id === d.permission.id) {
              this.repository.delete(queries[i].id);
              queries.splice(i, 1);
              break;
            }
            if (i === queries.length - 1) this.repository.save({ ...d, status: 'DELETE' });
          }
        });
      }
      else {
        await this.repository.save({ ...d, status: 'DELETE' });
      }
    });
  }

  async createBulk(body: AddDeletePermissions): Promise<UserPermission[]> {
    const { permissionIds } = body;
    const { userId } = body;
    const queries = await this.userRepository.findOne({ where: { id: userId }, relations: ['userPermissions', 'roles', 'roles.permissions'] });
    const temp = [];
    if (queries === undefined) {
      throw new NotFoundException('User not found');
    }
    queries.roles.map(role => {
      permissionIds.forEach(permissionId => {
        let status = 0;
        queries.userPermissions.forEach(async userPermission => {
          if (userPermission.permission.id === permissionId && userPermission.status === 'DELETE') {
            await this.repository.delete({ id: userPermission.permission.id });
            status = 1;
          }
          if (userPermission.permission.id === permissionId && userPermission.status === 'ADD') {
            // throw new BadRequestException(`Already existed permission with ${userPermission.permission.method.name} ${userPermission.permission.module.name}`);
            status = 1;
          }
        });
        if (status === 0) {
          role.permissions.map(permission => {
            if (permissionId === permission.id) {
              throw new BadRequestException(`Already existed permission with ${permission.method.name} ${permission.module.name}`);
            }
          });
          temp.push({ user: { id: userId }, permission: { id: permissionId }, status: 'ADD' });
        }
      });
    });
    let result: UserPermission[];
    if (temp.length !== 0) result = await this.repository.save(temp);
    return result;
  }
}
