import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { Methods } from '@src/common/decorators/methods.decorator';
import { Modules } from '@src/common/decorators/modules.decorator';
import { MethodName } from '@src/common/enums/methods.enum';
import { ModulesName } from '@src/common/enums/modules.enum';
import { ValidationPipe } from '@src/common/pipes/validation.pipe';
import { Bookings } from '@src/entities/bookings.entity';
import { UserRequestDto } from '@src/models/users/user-request.dto';
import { BookingService } from './booking.service';

@Crud({
  model: {
    type: Bookings
  },
  query: {
    join: {
      user: {
        allow: ['fullName', 'email', 'username', 'phone'],
        eager: true
      },
      room: {
        eager: true,
        allow: ['name']
      }
    },
    sort: [
      {
        field: 'id',
        order: 'DESC'
      }
    ]
  },
  routes: {
    exclude: ['deleteOneBase', 'replaceOneBase', 'createManyBase']
  }
})
@Controller('booking')
@ApiTags('booking')
@Modules(ModulesName.BOOKING)
export class BookingController implements CrudController<Bookings> {
  constructor(public readonly service: BookingService) { }

  get base(): CrudController<Bookings> {
    return this;
  }

  @Override('createOneBase')
  @ApiBearerAuth()
  @Methods(MethodName.POST)
  @ApiBody({
    required: true, schema: {
      type: 'number',
      example: {
        roomId: 1
      }
    }
  })
  create(@Req() req: UserRequestDto, @Body('roomId', new ValidationPipe) roomId: number) {
    return this.service.create(req.user.id, roomId, req.user.phone);
  }
}
