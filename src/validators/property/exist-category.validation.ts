import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '@src/entities/category.entity';
import { CategoryConstant } from '@src/constant/category.constant';

@ValidatorConstraint({ name: 'isExisted', async: true })
@Injectable()
export class DontExistedCategoryValidator implements ValidatorConstraintInterface {

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.value} do not exist, please try another`;
  }

  async validate(value: Category, validationArguments?: ValidationArguments): Promise<boolean> {
    if(value.id > CategoryConstant.length) throw new NotFoundException('Not found category');
    return true;
  }
}