import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Modules } from '@src/common/decorators/modules.decorator';
import { ModulesName } from '@src/common/enums/modules.enum';
import { method } from '@src/constant/config-crud.constant';
import { Property } from '@src/entities/property.entity';
import { PropertyService } from './property.service';

@Crud({
  model: {
    type: Property
  },
  query: {
    join: {
    }
  }
})
@Modules(ModulesName.PROPERTY)
@ApiTags('properties')
@Controller('properties')
export class PropertyController implements CrudController<Property>{
  constructor(public service: PropertyService) { }

  get base():CrudController<Property> {
    return this;
  }
}
