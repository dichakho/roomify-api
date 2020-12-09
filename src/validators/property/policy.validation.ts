import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { DestinationService } from '@src/app/destination/destination.service';
import { Policy } from '@src/entities/policy.entity';

@ValidatorConstraint({ name: 'isValidate', async: true })
@Injectable()
export class PolicyValidator implements ValidatorConstraintInterface {
  constructor(private destinationService: DestinationService) {
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Value must be less than 999999 and greater than 1000, please try another`;
  }

  async validate(value: Policy, validationArguments?: ValidationArguments): Promise<boolean> {
    if(value.electricity < 1000 || value.electricity > 999999 || value.water < 1000 || value.water > 999999 || value.parking < 1000 || value.parking > 999999 || value.internet < 1000 || value.internet > 999999) return false;
    return true;
  }
}
