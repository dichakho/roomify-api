import { Injectable } from '@nestjs/common';
import { BaseService } from '@src/base.service';
import { UserPermission } from '@src/entities/user-permission.entity';
import { UserPermissionRepository } from './user-permission.repository';

@Injectable()
export class UserPermissionService extends BaseService<UserPermission, UserPermissionRepository>{
  constructor(protected repository: UserPermissionRepository) {
    super(repository);
  }
}
