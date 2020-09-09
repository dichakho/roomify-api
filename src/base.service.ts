import { Injectable } from '@nestjs/common';
import { BaseEntity, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { IBaseService } from './i.base.service';
import { uploads } from './plugins/cloudinary.plugin';
import { unlinkSync } from 'fs';

@Injectable()
export class BaseService<T extends BaseEntity, R extends Repository<T>> extends TypeOrmCrudService<T> implements IBaseService<T> {

  constructor(protected repository: R) {
    super(repository);
  }

  index(): Promise<T[]> {
    return this.repository.find();
  }

  async uploadImage(file: any): Promise<string> {
    const image = await uploads(file);
    console.log('IMAGE --->', image);
    await unlinkSync(file.path);
    return '';
  }

}
