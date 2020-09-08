import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, UseGuards, Request, Patch, Body, Post } from '@nestjs/common';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { User } from '@src/entities/user.entity';
import { Modules } from '@src/common/decorators/modules.decorator';
import { UserService } from './user.service';
import { ModulesName } from '../../common/enums/modules.enum';
import { method } from '../../constant/method-crud.constant';
import { JwtAuthGuard } from '@src/common/guards/jwt-auth.guard';
import { UpdateMyUser } from '@src/models/users/update-my-user.model';
import { UserRequest } from '@src/models/users/user-request.model';
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
  routes: method
})
@Modules(ModulesName.USER)
@ApiTags('v1/users')
@Controller('users')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req) {
    const { user } = req;
    user.role = user.roles[0].name;
    user.roles = undefined;
    user.permissions = undefined;
    return user;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateMe(@Request() req: UserRequest, @Body() body: UpdateMyUser) {
    return this.service.updateMyInformation(req.user, body);
  }

  get base(): CrudController<User> {
    return this;
  }

}
