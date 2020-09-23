import { Injectable } from '@nestjs/common';
import { BaseService } from '@src/base.service';
import { Property } from '@src/entities/property.entity';
import { PropertyRepository } from './property.repository';

@Injectable()
export class PropertyService extends BaseService<Property, PropertyRepository> {
  constructor(protected repository: PropertyRepository) {
    super(repository);
  }
}
