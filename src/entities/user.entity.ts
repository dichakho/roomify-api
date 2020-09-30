/* eslint-disable @typescript-eslint/no-unused-vars */
import { ManyToMany, JoinTable, Entity, Column, IsNull, Unique, OneToMany, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsString, IsEmail, IsIn, IsNumber, IsMobilePhone } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { BaseEntity } from './base.entity';
import { Role } from './roles.entity';
import { UserStatus } from '../common/enums/userStatus.enum';
import { enumToArray } from '../utils/helper';
import { Property } from './property.entity';

const { CREATE, UPDATE } = CrudValidationGroups;
@Entity('users')
export class User extends BaseEntity {
  @ApiProperty({ example: 'Admin' })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString()
  @Column()
  fullName: string;

  @ApiProperty({ example: 'admin' })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString()
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: 'member@gmail.com' })
  @IsOptional({ groups: [UPDATE] })
  // @IsNotEmpty({ groups: [CREATE] })
  @IsEmail()
  @Column({ nullable: true })
  email: string;

  @ApiProperty({ example: 'admin' })
  @ApiProperty({ writeOnly: true })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString()
  @Column()
  password: string;

  @ApiProperty({ example: '0981234899' })
  @IsOptional({ groups: [UPDATE] })
  // @IsNotEmpty({ groups: [CREATE] })
  @IsString()
  @IsMobilePhone('vi-VN')
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({
    example:
      'https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png'
  })
  @IsOptional({ groups: [UPDATE] })
  // @IsNotEmpty({ groups: [CREATE] })
  @IsString()
  @Column({
    default:
      'https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png',
    nullable: true
  })
  avatar: string;

  @ApiProperty({ example: 'ACTIVE' })
  @IsOptional({ groups: [UPDATE] })
  // @IsNotEmpty({ groups: [CREATE] })
  @IsIn(enumToArray(UserStatus))
  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE
  })
  status: string;

  @IsOptional()
  @ApiProperty({ example: [4] })
  @IsNumber({}, { each: true })
  roleIds: Array<number>;

  @ManyToMany(() => Role, (role: Role) => role.users, { cascade: true })
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @OneToMany(type => Property, property => property.owner)
  properties: Array<Property>;
}
