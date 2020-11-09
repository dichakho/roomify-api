import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { Methods } from '@src/common/decorators/methods.decorator';
import { Modules } from '@src/common/decorators/modules.decorator';
import { MethodName } from '@src/common/enums/methods.enum';
import { ModulesName } from '@src/common/enums/modules.enum';
import { method } from '@src/constant/config-crud.constant';
import { Property } from '@src/entities/property.entity';
import { CreatePropertyDTO } from '@src/models/property/create.dto';
import { PropertyService } from './property.service';

@Crud({
  model: {
    type: Property
  },
  query: {
    join: {
      amenities: {
        eager: true,
        allow: ['name']
      },
      rooms: {
        eager: true
      }
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

  get base():CrudController<Property> {
    return this;
  }

  @Override('createOneBase')
  createOne(@Body() body: CreatePropertyDTO) {
    return this.service.create(body);
  }
}
