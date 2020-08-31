import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Category } from '../../entities/category.entity';

export default class CreateCategories implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const categoryRepository = connection.getTreeRepository(Category);
    /**
     * Parent category
     */
    await factory(Category)({ payload: { name: 'Phòng cho thuê' } }).create();
    await factory(Category)({ payload: { name: 'Phòng ở ghép' } }).create();
    await factory(Category)({ payload: { name: 'Nhà nguyên căn' } }).create();
    await factory(Category)({ payload: { name: 'Căn hộ' } }).create();


    const roots = await categoryRepository.findRoots();

    /**
     * Child category
     */
    // await factory(Category)({
    //   payload: { name: 'Medicum Toy' },
    //   parent: roots[0]
    // }).create();
    // await factory(Category)({
    //   payload: { name: 'Gối chữ u' },
    //   parent: roots[1]
    // }).create();
  }
}
