import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Category } from '../../entities/category.entity';
import { CategoryConstant } from '@src/constant/category.constant';

export default class CreateCategories implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {

    CategoryConstant.forEach(async (category) => {
      await factory(Category)({ payload: category }).create();
    });
    // await factory(Category)({ payload: { name: 'Phòng cho thuê' } }).create();
    // await factory(Category)({ payload: { name: 'Phòng ở ghép' } }).create();
    // await factory(Category)({ payload: { name: 'Nhà nguyên căn' } }).create();
    // await factory(Category)({ payload: { name: 'Căn hộ' } }).create();

  }
}
