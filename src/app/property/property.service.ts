import { Injectable } from '@nestjs/common';
import { BaseService } from '@src/base.service';
import { Property } from '@src/entities/property.entity';
import { CreatePropertyDTO } from '@src/models/property/create.dto';
import { PropertyRepository } from './property.repository';

@Injectable()
export class PropertyService extends BaseService<Property, PropertyRepository> {
  constructor(protected repository: PropertyRepository) {
    super(repository);
  }

  async create(data: CreatePropertyDTO) {
    console.log('property ---->', data);
    const owner = await this.repository.findOne(data.owner.id);
  }
}
