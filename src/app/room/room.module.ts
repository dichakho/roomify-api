import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '@src/entities/room.entity';
import { RoomController } from './room.controller';
import { RoomRepository } from './room.repository';
import { RoomService } from './room.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomRepository])],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService]
})
export class RoomModule {}
