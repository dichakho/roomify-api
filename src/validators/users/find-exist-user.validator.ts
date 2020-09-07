// import { ValidatorConstraintInterface, ValidatorConstraint, ValidationArguments } from 'class-validator';
// import { UserService } from '@src/app/user/user.service';
// import { Injectable } from '@nestjs/common';
// @ValidatorConstraint({ name: 'CheckExistUser', async: true })
// @Injectable()
// export class CheckExistUser implements ValidatorConstraintInterface {
//   constructor(private readonly userService: UserService) { }

//   validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
//     console.log('FIND VALIDATOR', value);
//     return false;
//   }

//   defaultMessage?(validationArguments?: ValidationArguments): string {
//     return `${validationArguments.value} is not found`;
//   }
// }
