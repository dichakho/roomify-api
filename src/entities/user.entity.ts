/* eslint-disable @typescript-eslint/no-unused-vars */
import { ManyToMany, JoinTable, Entity, Column, IsNull } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsString, IsEmail, IsIn, IsNumber } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { BaseEntity } from './base.entity';
import { Role } from './roles.entity';
import { UserStatus } from '../common/enums/userStatus.enum';
import { enumToArray } from '../core/utils/helper';

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
  @Column()
  username: string;

  @ApiProperty({ example: 'member@gmail.com' })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
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
  @IsNotEmpty({ groups: [CREATE] })
  @IsString()
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({
    example:
      'https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png'
  })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString()
  @Column({
    default:
      'https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png',
    nullable: true
  })
  avatar: string;

  @ApiProperty({ example: 'ACTIVE' })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
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

  // @ManyToMany(
  //   type => Role,
  //   role => role.users,
  // )
  @ManyToMany(() => Role, (role: Role) => role.users, { cascade: true })
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  // @BeforeInsert()
  // @BeforeUpdate()
  // async hashPassword() {
  //   const userRepository = User.getRepository();
  //   // const dbCurrentUser = await userRepository.findOne(this.id);
  //   // if (this.password && this.password !== dbCurrentUser.password)
  //   this.password = await Bcrypt.hash(this.password);
  // }
}
