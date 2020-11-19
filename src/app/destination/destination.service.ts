import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@src/base.service';
import { Destination } from '@src/entities/destinations.entity';
import { TreeRepository } from 'typeorm';
import { DestinationRepository } from './destination.repository';

@Injectable()
export class DestinationService extends BaseService<Destination, DestinationRepository> {
  constructor(protected repository:DestinationRepository,
    @InjectRepository(Destination)
    private readonly treeRepository:TreeRepository<Destination>){
    super(repository);
  }

  async findTree(data: number): Promise<Destination> {
    const destination = this.repository.create();
    destination.id = data;
    const result = await this.treeRepository.findAncestorsTree(destination);
    return result;
  }
}
