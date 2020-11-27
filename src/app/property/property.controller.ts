import { Body, Controller, ForbiddenException, Get, Param, ParseIntPipe, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { Methods } from '@src/common/decorators/methods.decorator';
import { Modules } from '@src/common/decorators/modules.decorator';
import { MethodName } from '@src/common/enums/methods.enum';
import { ModulesName } from '@src/common/enums/modules.enum';
import { method } from '@src/constant/config-crud.constant';
import { Property } from '@src/entities/property.entity';
import { CreatePropertyDTO } from '@src/models/property/create.dto';
import { UpdatePropertyDTO } from '@src/models/property/update.dto';
import { UserRequestDto } from '@src/models/users/user-request.dto';
import { PropertyService } from './property.service';

@Crud({
  model: {
    type: Property
  },
  query: {
    sort: [
      {
        field: 'id',
        order: 'DESC'
      }
    ],
    join: {
      category: {
        eager: true,
        allow: ['name', 'slug']
      },
      owner: {
        eager: true,
        allow: ['fullName', 'username', 'email', 'phone', 'avatar']
      },
      destination: {
        eager: true,
        allow: ['name']
      },
      'destination.parent': {
        eager: true,
        allow: ['name'],
        alias: 'district'
      },
      'destination.parent.parent': {
        eager: true,
        allow: ['name']
      }
    }
  },
  routes: {
    getManyBase: {
      decorators: []
    },
    getOneBase: {
      decorators: []
    }
  }
})
@Modules(ModulesName.PROPERTY)
@ApiTags('properties')
@Controller('properties')
export class PropertyController implements CrudController<Property>{
  constructor(public service: PropertyService) { }

  @ApiBearerAuth()
  @Patch('restore/:id')
  @Methods(MethodName.PATCH)
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id);
  }

  @ApiBearerAuth()
  @Methods(MethodName.GET)
  @Get(':id/rooms')
  getRoom(@Param('id', ParseIntPipe) id: number) {
    return this.service.getRooms(id);
  }

  get base(): CrudController<Property> {
    return this;
  }

  @ApiBearerAuth()
  @Methods(MethodName.POST)
  @Override('createOneBase')
  createOne(@Body() body: CreatePropertyDTO, @Req() req: UserRequestDto) {
    return this.service.create(body, req);
  }

  @ApiBearerAuth()
  @Methods(MethodName.PATCH)
  @Override('updateOneBase')
  updateOne(@Body() body: UpdatePropertyDTO, @Param('id', ParseIntPipe) id: number, @Req() req: UserRequestDto) {
    return this.service.update(body, id, req);
  }

  @ApiBearerAuth()
  @Methods(MethodName.DELETE)
  @Override('deleteOneBase')
  deleteOne(@Param('id', ParseIntPipe) id: number, @Req() req: UserRequestDto) {

    return this.service.delete(id, req);
  }

}
