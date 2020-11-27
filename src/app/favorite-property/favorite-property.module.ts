import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteProperty } from '@src/entities/favorite_property.entity';
import { FavoritePropertyController } from './favorite-property.controller';
import { FavoritePropertyRepository } from './favorite-property.repository';
import { FavoritePropertyService } from './favorite-property.service';

@Module({
  imports: [TypeOrmModule.forFeature([FavoritePropertyRepository])],
  controllers: [FavoritePropertyController],
  providers: [FavoritePropertyService]
})
export class FavoritePropertyModule {}
