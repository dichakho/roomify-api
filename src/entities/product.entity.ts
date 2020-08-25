import { IsOptional, IsNotEmpty, IsString, IsInt, IsNumber, Max } from 'class-validator';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { CrudValidationGroups } from '@nestjsx/crud';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';
import { Category } from './category.entity';

const { UPDATE, CREATE } = CrudValidationGroups;

@Entity('products')
export class Product extends BaseEntity {
  @ApiProperty({ example: 'Product1' })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString()
  @Column()
  name: string;

  @ApiProperty({ example: 95.37 })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @ApiProperty({ example: 0.9 })
  @IsOptional()
  @Max(1)
  @Column('decimal', { precision: 3, scale: 2 })
  discountRate: number;

  @ApiProperty({ example: 'https://www.itl.cat/pngfile/big/38-385329_gaming-thumbnail-background-youtube.jpg' })
  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  thumbnail: string;

  @ApiProperty({ example: ['https://www.apple.com/v/product-red/o/images/meta/og__dbjwy50zuc02.png?202004130840', 'https://9to5mac.com/wp-content/uploads/sites/6/2018/04/iphone-x-red.jpg?quality=82&strip=all&w=1600'] })
  @IsOptional()
  @Column('simple-array')
  image: string[];

  @ApiProperty({ example: 10 })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsInt()
  @Column()
  stocks: number;

  @ApiProperty({ example: 5 })
  @IsOptional()
  @Max(5, { each: true })
  @Column('decimal', { precision: 3, scale: 2, default: 0 })
  rating: number;

  @ApiProperty({ example: 'This is a memo of product' })
  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  memo: string;

  @ApiProperty({ example: 'This is a detail of product' })
  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  details: string;

  @IsOptional()
  @ApiProperty({ example: [2, 3] })
  @IsNumber({}, { each: true })
  categoryIds: Array<number>;

  @ManyToMany(
    type =>Category,
    category => category.products
  )
  @JoinTable({ name: 'product_category' })
  category: Category[];

}
