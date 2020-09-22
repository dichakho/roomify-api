import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, UseGuards, Request, Patch, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from '@src/entities/user.entity';
import { Modules } from '@src/common/decorators/modules.decorator';
import { JwtAuthGuard } from '@src/common/guards/jwt-auth.guard';
import { UpdateMyUser } from '@src/models/users/update-my-user.model';
import { UserRequest } from '@src/models/users/user-request.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from '@src/utils/file-upload';
import { UpdateMyPassword } from '@src/models/users/update-my-password.model';
import { method } from '../../constant/method-crud.constant';
import { ModulesName } from '../../common/enums/modules.enum';
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('password')
  async updateMyPassword(@Request() req: UserRequest, @Body() body: UpdateMyPassword) {
    return this.service.updateMyPassword(req.user.id, body);
  }

  @ApiBearerAuth()
  @Patch('avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar',
    {
      dest: 'uploads',
      preservePath: true,
      fileFilter: imageFileFilter
    }))
  async uploadAvatar(@UploadedFile() file, @Request() req: UserRequest) {
    return this.service.updateAvatar(file.path, req);
  }

  // @Override()
  // async deleteOne(@Param('id') id:number) {
  //   this.service.deleleSoft(id);
  // }
}
