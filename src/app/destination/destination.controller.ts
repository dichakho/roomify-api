import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Modules } from '@src/common/decorators/modules.decorator';
import { ModulesName } from '@src/common/enums/modules.enum';
import { method } from '@src/constant/config-crud.constant';
import { Destination } from '@src/entities/destinations.entity';
import { DestinationService } from './destination.service';

@Crud({
  model: {
    type: Destination
  },
  query: {
    join: {
    }
  }
})
@Modules(ModulesName.DESTINATION)
@ApiTags('destinations')
@Controller('destinations')
export class DestinationController implements CrudController<Destination> {
  constructor(public service: DestinationService) { }

  get base():CrudController<Destination> {
    return this;
  }
}
