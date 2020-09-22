import { Injectable } from '@nestjs/common';
import { BaseEntity, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { unlinkSync } from 'fs';
import { IBaseService } from './i.base.service';
import { uploads } from './plugins/cloudinary.plugin';

@Injectable()
export class BaseService<T extends BaseEntity, R extends Repository<T>> extends TypeOrmCrudService<T> implements IBaseService<T> {

  constructor(protected repository: R) {
    super(repository);
  }

  index(): Promise<T[]> {
    return this.repository.find();
  }

  async uploadImage(path: string, folder: string): Promise<string> {
    const image = await uploads(path, folder);
    console.log('IMAGE --->', image);
    await unlinkSync(path);
    return image;
  }

  async deleleSoft(id: number) {
    try {
      const result = await this.repository.softDelete(id);
    } catch (error) {
      console.log(error);

    }

  }
}
