import { Controller, UsePipes } from '@nestjs/common';
import { Crud, CrudController, Override, ParsedBody } from '@nestjsx/crud';
import { Product } from 'src/entities/product.entity';
import { ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ProductService } from './product.service';
@Crud({
  model: {
    type: Product
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true
    }
  },
  query: {
    join: {
      category: {
        eager: true
      }
    },
    limit: 10,
    maxLimit: 50,
    alwaysPaginate: true
  }
})
@ApiTags('v1/products')
@Controller('product')
export class ProductController implements CrudController<Product> {
  constructor(public service: ProductService) {}

  get base(): CrudController<Product> {
    return this;
  }

  @Override('createOneBase')
  @UsePipes(new ValidationPipe())
  async createOne(@ParsedBody() dto: Product) {
    return await this.service.createOneObject(dto);
  }
}
