import { Entity, Column, TreeChildren, TreeParent, Tree, Unique, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEmpty, IsNotEmpty } from 'class-validator';
import slug from 'slug';
import { CrudValidationGroups } from '@nestjsx/crud';
import { TreeBase } from './treebase.entity';
import { Room } from './room.entity';

const { CREATE, UPDATE } = CrudValidationGroups;
@Entity('categories')
@Tree('materialized-path')
@Unique(['slug'])
export class Category extends TreeBase {

  @ApiProperty({ example: 'Category1' })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column()
  name: string;

  // @ApiProperty({ example: 'Category-12345'})
  @IsOptional({ groups: [UPDATE] })
  @Column()
  slug: string;

  @IsOptional()
  @IsEmpty()
  @TreeChildren({ cascade: true })
  children: Category[];

  @IsOptional()
  @IsEmpty()
  @TreeParent()
  parent: Category;

  @OneToMany(
    type => Room,
    room => room.category
  )
  rooms: Room[];

  // @BeforeInsert()
  // generateSlug() {
  //   const today = new Date();
  //   const year = today.getFullYear();
  //   const month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` :today.getMonth() + 1;
  //   const date = today.getDate() < 10 ? `0${today.getDate()}`: today.getDate();
  //   const hours = today.getHours() < 10 ? `0${today.getHours()}`: today.getHours();
  //   const minutes = today.getMinutes() < 10 ? `0${today.getMinutes()}`: today.getMinutes();
  //   const seconds = today.getSeconds() < 10 ? `0${today.getSeconds()}`: today.getSeconds();
  //   const time = `${year}${month}${date}${hours}${minutes}${seconds}`;
  //   this.slug = slug(this.name ,{lower: true}) + '-' + time;
  // }

}
