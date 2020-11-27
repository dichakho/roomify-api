import { Module } from '@nestjs/common';
import { Property } from '@src/entities/property.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteProperty } from '@src/entities/favorite_property.entity';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { PropertyRepository } from './property.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PropertyRepository, FavoriteProperty])],
  providers: [PropertyService],
  controllers: [PropertyController],
  exports: [PropertyService]
})
export class PropertyModule {}
