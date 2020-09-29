import { Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Methods } from '@src/common/decorators/methods.decorator';
import { Modules } from '@src/common/decorators/modules.decorator';
import { MethodName } from '@src/common/enums/methods.enum';
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
      properties: {
        eager: true
      }
    }
  }
})
@Modules(ModulesName.DESTINATION)
@ApiTags('destinations')
@Controller('destinations')
export class DestinationController implements CrudController<Destination> {
  constructor(public service: DestinationService) { }

  @ApiBearerAuth()
  @Patch('restore/:id')
  @Methods(MethodName.PATCH)
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id);
  }

  get base():CrudController<Destination> {
    return this;
  }
}
