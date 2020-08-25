import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Category } from '../../entities/category.entity';

export default class CreateCategories implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const categoryRepository = connection.getTreeRepository(Category);
    /**
     * Parent category
     */
    await factory(Category)({ payload: { name: 'Trò chơi' } }).create();
    await factory(Category)({ payload: { name: 'Gấu bông - Gối' } }).create();
    await factory(Category)({ payload: { name: 'Văn phòng phẩm' } }).create();
    await factory(Category)({ payload: { name: 'Đồ gia dụng' } }).create();
    await factory(Category)({ payload: { name: 'Du lịch' } }).create();
    await factory(Category)({ payload: { name: 'Trang trí' } }).create();

    const roots = await categoryRepository.findRoots();

    /**
     * Child category
     */
    await factory(Category)({
      payload: { name: 'Medicum Toy' },
      parent: roots[0]
    }).create();
    await factory(Category)({
      payload: { name: 'Gối chữ u' },
      parent: roots[1]
    }).create();
  }
}
