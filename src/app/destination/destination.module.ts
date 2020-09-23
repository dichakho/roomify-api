import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destination } from '@src/entities/destinations.entity';
import { DestinationService } from './destination.service';
import { DestinationController } from './destination.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Destination])],
  providers: [DestinationService],
  exports: [DestinationService],
  controllers: [DestinationController]
})
export class DestinationModule {}
