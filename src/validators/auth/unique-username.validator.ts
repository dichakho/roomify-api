import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../app/user/user.service';

@ValidatorConstraint({ name: 'isUsernameUnique', async: true })
@Injectable()
export class UniqueUsernameValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.value} is taken, please try another`;
  }

  async validate(value: string, validationArguments?: ValidationArguments): Promise<boolean> {
    const result = await this.userService.findOneByUsername(value);
    return !result;
  }
}
