import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomRepository } from '../room/room.repository';
import { BookingController } from './booking.controller';
import { BookingRepository } from './booking.respository';
import { BookingService } from './booking.service';

@Module({
  controllers: [BookingController],
  providers: [BookingService],
  imports: [TypeOrmModule.forFeature([BookingRepository, RoomRepository])]
})
export class BookingModule {}
