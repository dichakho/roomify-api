import { ValidatorConstraintInterface, ValidatorConstraint, ValidationArguments } from 'class-validator';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Role } from '@src/entities/roles.entity';
@ValidatorConstraint({ name: 'CheckRoleOfUser', async: true })
@Injectable()
export class CheckRoleOfUser implements ValidatorConstraintInterface {

  validate(value: Role, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    if(value.id !== undefined && (value.id === 3 || value.id === 1)) throw new ForbiddenException('Can not add role OWNER and ADMIN');
    return true;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `${validationArguments.value} is not found`;
  }
}
