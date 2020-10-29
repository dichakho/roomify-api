import { Body, Controller, Delete, Get, ParseIntPipe, Post, Query, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { Methods } from '@src/common/decorators/methods.decorator';
import { Modules } from '@src/common/decorators/modules.decorator';
import { MethodName } from '@src/common/enums/methods.enum';
import { ModulesName } from '@src/common/enums/modules.enum';
import { GetMany } from '@src/models/base/getMany.dto';
import { AddDeletePermissions } from '@src/models/user-permissions/permission.dto';
import { UserPermissionService } from './user-permission.service';

@Modules(ModulesName.USER_PERMISSION)
@Controller('user-permission')
@ApiTags('user-permission')
export class UserPermissionController {
  constructor(public service: UserPermissionService) { }

  @Delete()
  deleteMany(@Body() body: AddDeletePermissions) {
    return this.service.deleteMany(body);
  }

  @Post()
  createMany(@Body() body: AddDeletePermissions) {
    console.log(body);
    return this.service.createBulk(body);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  getManyData(@Query() query: GetMany) {
    return this.service.getManyData(query);

  }
}
