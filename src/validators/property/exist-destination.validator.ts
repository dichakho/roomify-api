import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DestinationService } from '@src/app/destination/destination.service';
import { Destination } from '@src/entities/destinations.entity';

@ValidatorConstraint({ name: 'isExisted', async: true })
@Injectable()
export class ExistedDestinationValidator implements ValidatorConstraintInterface {
  constructor(private destinationService: DestinationService) {
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.value} do not exist, please try another`;
  }

  async validate(value: Destination, validationArguments?: ValidationArguments): Promise<boolean> {
    console.log('validation argument ---> \n', validationArguments);

    const result = await this.destinationService.findTree(value);
    console.log('result ----> \n', result);
    if(!result) return false;
    if(!result.parent || !result.parent.parent) throw new NotFoundException('Destination must be PHUONG, please try another');
    return true;
  }
}
