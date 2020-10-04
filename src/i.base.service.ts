import { DeepPartial } from 'typeorm';

export interface IBaseService<T> {
  index(): Promise<T[]>

  uploadImage(path : string, folder: string): Promise<string>

  delele(id : number)

  restore(id:number)
  createBulkData(dto: DeepPartial<T>[]): Promise<T[]>
}
