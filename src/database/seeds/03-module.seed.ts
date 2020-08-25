import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Module } from '../../entities/module.entity';

export default class CreateModules implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const modules = [
      { name: 'USER', description: 'CRUD user' },
      { name: 'PRODUCT', description: 'CRUD product' },
      { name: 'CATEGORY', description: 'CRUD category' },
      { name: 'METHOD', description: 'CRUD method' },
      { name: 'MODULE', description: 'CRUD module' },
      { name: 'PERMISSION', description: 'CRUD permission' },
      { name: 'ROLE', description: 'CRUD role' }
    ];
    await connection
      .createQueryBuilder()
      .insert()
      .into(Module)
      .values(modules)
      .execute();
  }
}
