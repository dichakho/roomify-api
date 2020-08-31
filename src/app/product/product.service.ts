import { Injectable } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { CategoryRepository } from '../category/category.repository';

@Injectable()
export class ProductService extends TypeOrmCrudService<Product> {
  constructor(
    @InjectRepository(Product) repo,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryRepository: CategoryRepository
  ) {
    super(repo);
  }

  async createOneObject(dto: Product): Promise<Product> {
    const productObject = dto;
    productObject.category = await this.categoryRepository.findByIds(productObject.categoryIds);
    const result = this.productRepository.create(productObject);
    await this.productRepository.save(result);
    return result;
  }
}
