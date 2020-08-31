import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from '@src/entities/user.entity';
import { UserService } from './user.service';

@Crud({
  model: {
    type: User
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true
    }
  },
  query: {
    exclude: ['password'],
    join: {
      roles: {
        allow: ['name'],
        eager: true
      }
      // 'role.permissions': {
      //   eager: true,
      // },
    },
    limit: 10,
    maxLimit: 50,
    alwaysPaginate: true
  }
})
@ApiTags('v1/users')
@Controller('users')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  get base(): CrudController<User> {
    return this;
  }
}
