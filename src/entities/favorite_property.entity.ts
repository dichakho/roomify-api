import { ApiProperty } from '@nestjs/swagger';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Property } from './property.entity';
import { User } from './user.entity';

@Entity('favorite_property')
export class FavoriteProperty extends BaseEntity {
  @JoinColumn()
  userId: number

  @JoinColumn()
  propertyId: number

  @ApiProperty({ readOnly: true })
  @ManyToOne(() => User, (user: User) => user.favorteProperty)
  user: User

  @ApiProperty({ readOnly: true })
  @ManyToOne(() => Property, (property: Property) => property.favoriteProperty)
  property: Property
}
