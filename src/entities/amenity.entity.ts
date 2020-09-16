import { ApiProperty } from "@nestjs/swagger";
import { CrudValidationGroups } from "@nestjsx/crud";
import { IsOptional, IsNotEmpty } from "class-validator";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Property } from "./property.entity";
const { CREATE, UPDATE } = CrudValidationGroups;
@Entity('amenities')
export class Amenity extends BaseEntity {
  @PrimaryColumn()
  id: number

  @ApiProperty({ example: 'Category1' })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column()
  name: string;

  @ManyToMany(
    type => Property,
    properties => properties.amenities
  )
  properties: Property[];
}
