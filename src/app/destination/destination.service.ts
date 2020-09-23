import { Injectable } from '@nestjs/common';
import { BaseService } from '@src/base.service';
import { Destination } from '@src/entities/destinations.entity';
import { DestinationRepository } from './destination.repository';

@Injectable()
export class DestinationService extends BaseService<Destination, DestinationRepository> {
  constructor(protected repository:DestinationRepository){
    super(repository);
  }
}
