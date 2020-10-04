import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Controller, Get, UseGuards, Request, Patch, Body, UseInterceptors, UploadedFile, Param, ParseIntPipe } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from '@src/entities/user.entity';
import { Modules } from '@src/common/decorators/modules.decorator';
import { JwtAuthGuard } from '@src/common/guards/jwt-auth.guard';
import { UpdateMyUserDto } from '@src/models/users/update-my-user.dto';
import { UserRequestDto } from '@src/models/users/user-request.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from '@src/utils/file-upload';
import { UpdateMyPasswordDto } from '@src/models/users/update-my-password.dto';
import { UploadFileDto } from '@src/models/users/upload-file.dto';
import { Methods } from '@src/common/decorators/methods.decorator';
import { MethodName } from '@src/common/enums/methods.enum';
import { UserService } from './user.service';
import { ModulesName } from '../../common/enums/modules.enum';
import { UserPermissionService } from '../user-permission/user-permission.service';
@Crud({
  model: {
    type: User
  },
  query: {
    exclude: ['password'],
    join: {
      roles: {
        allow: ['name'],
        eager: true
      }
    }
  }
})
@Modules(ModulesName.USER)
@ApiTags('users')
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
  async updateMe(@Request() req: UserRequestDto, @Body() body: UpdateMyUserDto) {
    return this.service.updateMyInformation(req.user, body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('password')
  async updateMyPassword(@Request() req: UserRequestDto, @Body() body: UpdateMyPasswordDto) {
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Avatar of user',
    type: UploadFileDto
  })
  async uploadAvatar(@UploadedFile() file, @Request() req: UserRequestDto) {
    return this.service.updateAvatar(file.path, req);
  }

  @ApiBearerAuth()
  @Patch('restore/:id')
  @Methods(MethodName.PATCH)
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id);
  }

  get base(): CrudController<User> {
    return this;
  }

  // @Override()
  // @ApiBearerAuth()
  // @Methods(MethodName.DELETE)
  // async deleteOne(@Param('id') id: number) {
  //   this.service.deleleSoft(id);
  // }

}
