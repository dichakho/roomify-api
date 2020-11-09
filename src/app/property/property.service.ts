import { ForbiddenException, Injectable } from '@nestjs/common';
import { BaseService } from '@src/base.service';
import { Property } from '@src/entities/property.entity';
import { CreatePropertyDTO } from '@src/models/property/create.dto';
import { UserRequestDto } from '@src/models/users/user-request.dto';
import { PropertyRepository } from './property.repository';

@Injectable()
export class PropertyService extends BaseService<Property, PropertyRepository> {
  constructor(protected repository: PropertyRepository) {
    super(repository);
  }

  async create(data: CreatePropertyDTO, req: UserRequestDto) {
    const { user } = req;
    let temp = 0;
    for (let i = 0; i < user.roles.length; i += 1) {
      if (user.roles[i].name === 'OWNER' || user.roles[i].name === 'ADMIN') {
        temp = 1;
        break;
      }
    }
    if(temp === 0) throw new ForbiddenException('Only role owner can create property !!!');
    console.log('property ---->', data);
    const result = await this.repository.save(data);
    return result;
  }
}
