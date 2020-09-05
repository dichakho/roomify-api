import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from '@src/entities/user.entity';
import { UserService } from './user.service';
import { Modules } from '@src/common/decorators/modules.decorator';
import { Methods } from '@src/common/decorators/methods.decorator';

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
    },
    limit: 10,
    maxLimit: 50,
    alwaysPaginate: false
  },
  routes: {
    getOneBase: {
      decorators: [Methods('GET')]
    },
    getManyBase: {
      decorators: [Methods('GET')]
    }
  }
})
@Modules('USER')
@ApiTags('v1/users')
@Controller('users')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  get base(): CrudController<User> {
    return this;
  }
}
