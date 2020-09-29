import { Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { Methods } from '@src/common/decorators/methods.decorator';
import { Modules } from '@src/common/decorators/modules.decorator';
import { MethodName } from '@src/common/enums/methods.enum';
import { ModulesName } from '@src/common/enums/modules.enum';
import { method } from '@src/constant/config-crud.constant';
import { Room } from '@src/entities/room.entity';
import { RoomService } from './room.service';

@Crud({
  model: {
    type: Room
  },
  query: {
    join: {
    }
  }
})
@Modules(ModulesName.ROOM)
@ApiTags('rooms')
@Controller('rooms')
export class RoomController implements CrudController<Room> {
  constructor(public service: RoomService) { }

  @ApiBearerAuth()
  @Patch('restore/:id')
  @Methods(MethodName.PATCH)
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id);
  }

  get base():CrudController<Room> {
    return this;
  }

}
