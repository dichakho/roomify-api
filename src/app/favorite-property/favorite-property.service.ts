import { Injectable } from '@nestjs/common';
import { FavoriteProperty } from '@src/entities/favorite_property.entity';
import { FavoritePropertyRepository } from './favorite-property.repository';

@Injectable()
export class FavoritePropertyService {
  constructor(private readonly repository: FavoritePropertyRepository) { }

  async createOne(userId: number, propertyId: number): Promise<any> {
    const query = await this.repository.findOne({ where: { user: { id: userId }, property: { id: propertyId } } });
    console.log(query);
    if (query) {
      await this.repository.delete(query.id);
    }
    else {
      const result = await this.repository.save({ property: { id: propertyId }, user: { id: userId } });
      return result;
    }

  }

  async getFavoriteProperty(userId: number): Promise<any> {
    const data = await this.repository.find({ where: { user: { id: userId } }, relations: ['property'] });
    return { data };

  }
}
