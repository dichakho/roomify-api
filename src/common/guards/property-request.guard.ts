import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FavoriteProperty } from '@src/entities/favorite_property.entity';
import { createQueryBuilder } from 'typeorm';

@Injectable()
export class PropertyRequestGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    console.log(request);
    
    // const query = await createQueryBuilder().select('favorite_property').from(FavoriteProperty, 'favorite_property').where('favorite_property.userId =:userId', { userId: user.id }).getMany();
    // console.log(query);
    // return {query};
  }
}
