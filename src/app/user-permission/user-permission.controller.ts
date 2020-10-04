import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserPermission } from '@src/entities/user-permission.entity';
import { UserPermissionService } from './user-permission.service';

@Crud({
  model: {
    type: UserPermission
  },
  query: {
    join: {
      permissions: {
        eager: true
      }
    }
  }
})
@Controller('user-permission')
@ApiTags('user-permission')
export class UserPermissionController implements CrudController<UserPermission> {
  constructor(public service: UserPermissionService) { }

  get base(): CrudController<UserPermission> {
    return this;
  }
}
