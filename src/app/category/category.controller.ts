import { TreeRepository } from 'typeorm';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Category } from 'src/entities/category.entity';
import {
  Controller,
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
  Get,
  UseGuards,
  UseFilters,
  ForbiddenException,
  UsePipes
} from '@nestjs/common';
import { Crud, CrudController, ParsedBody, Override } from '@nestjsx/crud';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesGuard } from '@src/common/guards/roles.guard';
import { Methods } from '@src/common/decorators/methods.decorator';
import { JwtAuthGuard } from '@src/common/guards/jwt-auth.guard';
import { ModulesName } from '@src/common/enums/modules.enum';
import { Modules } from '@src/common/decorators/modules.decorator';
import { AuthGuard } from '@nestjs/passport';
import { HttpExceptionFilter } from '@src/common/exception-filter/http-exception.filter';
import { ValidationPipe } from '@src/common/pipes/validation.pipe';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { createSlug } from '../../core/utils/helper';

@Crud({
  model: {
    type: Category
  },
  params: {
    id: {
      field: 'id',
      type: 'number',
      primary: true
    }
  },
  query: {
    limit: 5,
    maxLimit: 50,
    alwaysPaginate: true
  }
})
@ApiTags('v1/categories')
@Controller('category')
@Modules(ModulesName.CATEGORY)
export class CategoryController implements CrudController<Category> {
  constructor(
    public service: CategoryService,
    private readonly repository: CategoryRepository,
    @InjectRepository(Category)
    private readonly treeRepository: TreeRepository<Category>
  ) {}

  get base() {
    return this;
  }

  @Override('createOneBase')
  async createOneOverride(@ParsedBody() dto: Category) {
    try {
      // let cateObject: Category;
      const cateObject = dto;
      if (dto.parentId) {
        const parentObject = await this.repository.findOne(dto.parentId);
        if (parentObject) {
          cateObject.parent = parentObject;
        } else {
          return new BadRequestException([
            {
              constraints: {
                isForeignKey: 'parentId must be an existed foreign key'
              },
              property: 'parentId'
            }
          ]).getResponse();
        }
      }
      cateObject.slug = createSlug(cateObject.name);
      const result = this.repository.create(cateObject);
      await this.repository.save(result);
      return result;
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new ConflictException();
      }
      throw new InternalServerErrorException();
    }
  }

  @Get('/all')
  @Methods('GET')
  @UsePipes(ValidationPipe)

  // @UseFilters(HttpExceptionFilter)
  // @UseGuards(JwtAuthGuard)
  // @UseGuards(RolesGuard)
  // @ApiBearerAuth()
  getAll() {
    try {
      return this.repository.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Override('getManyBase')
  async getManyOverride() {
    const category = await this.treeRepository.findTrees();
    console.log('hello', category);
    return category;
  }
}
