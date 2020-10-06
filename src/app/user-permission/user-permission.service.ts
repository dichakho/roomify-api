import { Injectable } from '@nestjs/common';
import { BaseService } from '@src/base.service';
import { UserPermission } from '@src/entities/user-permission.entity';
import { AddDeletePermissions } from '@src/models/user-permissions/permission.dto';
import { UserPermissionRepository } from './user-permission.repository';

@Injectable()
export class UserPermissionService extends BaseService<UserPermission, UserPermissionRepository>{
  constructor(protected repository: UserPermissionRepository) {
    super(repository);
  }

  async deleteMany(dto: AddDeletePermissions) {
    const { data } = dto;
    let promise;
    const queries = await this.repository.find({ where: { user: data[0].user, status: 'ADD' }, relations: ['permission'] });
    console.log('QUERY ---->', queries);
    data.map(d => {
      if(queries.length > 0) {
        promise = new Promise((resolve, reject) => {
          for (let i = 0; i < queries.length; i += 1) {
            if (queries[i].permission.id === d.permission.id) {
              const t = this.repository.delete(queries[i].id);
              console.log('HEHEHEHEHEHEHEHEH', t);
              queries.splice(i, 1);
              break;
            }
            if (i === queries.length - 1) this.repository.save({ ...d, status: 'DELETE' });
          }
        });
      }
      else {
        this.repository.save({ ...d, status: 'DELETE' });
      }
    });

  }
}
