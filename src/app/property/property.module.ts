import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { PropertyRepository } from './property.repository';
import { DestinationModule } from '../destination/destination.module';
import { DestinationRepository } from '../destination/destination.repository';
import { Destination } from '@src/entities/destinations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyRepository, Destination])],
  providers: [PropertyService],
  controllers: [PropertyController],
  exports: [PropertyService]
})
export class PropertyModule {}
