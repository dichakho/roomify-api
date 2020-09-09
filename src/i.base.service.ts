export interface IBaseService<T> {
  index(): Promise<T[]>

  uploadImage(path : string, folder: string): Promise<string>

  // findById(id: EntityId): Promise<T>

  // findByIds(id: [EntityId]): Promise<T[]>

  // store(data: any): Promise<T>

  // update(id: EntityId, data: any): Promise<T>

  // delete(id: EntityId): Promise<DeleteResult>
}
