import { Injectable } from '@nestjs/common';
import { BaseService } from '@src/base.service';
import { FavoriteProperty } from '@src/entities/favorite_property.entity';
import { GetMany } from '@src/models/base/getMany.dto';
import { FavoritePropertyRepository } from './favorite-property.repository';

@Injectable()
export class FavoritePropertyService extends BaseService<
  FavoriteProperty,
  FavoritePropertyRepository
> {
  constructor(protected readonly repository: FavoritePropertyRepository) {
    super(repository);
  }

  async create(userId: number, propertyId: number): Promise<any> {
    const query = await this.repository.findOne({
      where: { user: { id: userId }, property: { id: propertyId } }
    });
    console.log(query);
    if (query) {
      await this.repository.delete(query.id);
    } else {
      const result = await this.repository.save({
        property: { id: propertyId },
        user: { id: userId }
      });
      return result;
    }
  }

  async getFavoriteProperty(userId: number, query: GetMany): Promise<any> {
    // const data = await this.repository.find({ where: { user: { id: userId } }, relations: ['property'] });
    const temp = await this.getManyData(query, ['property'], { user: { id: userId } });
    const data = temp.result[0];
    const count = data.length;
    const total = temp.result[1];
    const pageCount = Math.ceil(total / temp.limit);
    return {
      count,
      total,
      page: temp.page,
      pageCount,
      data
    };
  }
}
