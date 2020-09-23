import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Modules } from '@src/common/decorators/modules.decorator';
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

  get base():CrudController<Room> {
    return this;
  }

}
