import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Modules } from '@src/common/decorators/modules.decorator';
import { ModulesName } from '@src/common/enums/modules.enum';
import { Amenity } from '@src/entities/amenity.entity';
import { AmenityService } from './amenity.service';

@Crud({
  model: {
    type: Amenity
  },
  query: {
    join: {
    }
  }
})
@Modules(ModulesName.AMENTITY)
@ApiTags('amenities')
@Controller('amenities')
export class AmenityController implements CrudController<Amenity> {
  constructor(public service: AmenityService){}

  get base(): CrudController<Amenity> {
    return this;
  }
}
