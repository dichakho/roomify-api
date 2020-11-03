import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      errors.map(a => {
        if(a.constraints.isNotEmpty !== undefined) throw new BadRequestException(a.constraints.isNotEmpty);
        if(a.constraints.isMobilePhone) throw new BadRequestException(a.constraints.isMobilePhone);
        if(a.constraints.isUnique) throw new BadRequestException(a.constraints.isUnique);
        if(a.constraints.matches) throw new BadRequestException(a.constraints.matches);
        throw new BadRequestException(a.constraints);

      });

    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
