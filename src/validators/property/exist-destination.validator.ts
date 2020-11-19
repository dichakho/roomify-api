import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DestinationService } from '@src/app/destination/destination.service';
import { Destination } from '@src/entities/destinations.entity';

@ValidatorConstraint({ name: 'isValidate', async: true })
@Injectable()
export class ExistedDestinationValidator implements ValidatorConstraintInterface {
  constructor(private destinationService: DestinationService) {
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.value} do not exist, please try another`;
  }

  async validate(value: number, validationArguments?: ValidationArguments): Promise<boolean> {
    const result = await this.destinationService.findTree(value);
    if(!result) return false;
    if(!result.parent || !result.parent.parent) throw new NotFoundException('Destination must be PHUONG, please try another');
    return true;
  }
}
