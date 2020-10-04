import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BaseEntity, DeepPartial, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { unlinkSync } from 'fs';
import { CrudRequest } from '@nestjsx/crud';
import { IBaseService } from './i.base.service';
import { uploads } from './plugins/cloudinary.plugin';

@Injectable()
export abstract class BaseService<T extends BaseEntity, R extends Repository<T>> extends TypeOrmCrudService<T> implements IBaseService<T> {

  constructor(protected repository: R) {
    super(repository);
  }

  index(): Promise<T[]> {
    return this.repository.find();
  }

  async uploadImage(path: string, folder: string): Promise<string> {
    const image = await uploads(path, folder);
    await unlinkSync(path);
    return image;
  }

  async delele(id: number) {
    const checkData = await this.repository.findOne(id);
    if (!checkData) throw new NotFoundException();
    await this.repository.delete(id);
  }

  async deleteOne(req: CrudRequest) {
    const { returnDeleted } = req.options.routes.deleteOneBase;
    const found = await this.getOneOrFail(req, returnDeleted);
    const data: any = found;
    await this.repository.softRemove(data);
  }

  async restore(id: number) {
    const checkData = await this.repository.findOne(id);
    if (!checkData) throw new NotFoundException();
    await this.repository.restore(id);
  }

  createBulkData(dto: DeepPartial<T>[]): Promise<T[]> {
    if (dto.length === 0) throw new BadRequestException('Nothing to change. Data is empty !!!');
    return this.repository.save(dto, { chunk: 50 });
  }
}
