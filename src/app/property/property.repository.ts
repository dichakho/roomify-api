import { Property } from '@src/entities/property.entity';
import { property } from 'lodash';
import { Repository, EntityRepository } from 'typeorm';
@EntityRepository(property)
export class PropertyRepository extends Repository<Property> {
  async findOneById(id: number): Promise<Property> {
    return this.findOne(id);
  }

}
