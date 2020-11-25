import { FavoriteProperty } from '@src/entities/favorite_property.entity';
import { Repository, EntityRepository } from 'typeorm';
@EntityRepository(FavoriteProperty)
export class FavoritePropertyRepository extends Repository<FavoriteProperty> {

}
