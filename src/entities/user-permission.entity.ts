import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { enumToArray } from '../utils/helper';
import { UserPermissionStatus } from '../common/enums/userPermissionStatus.enum';
import { BaseEntity } from './base.entity';
import { Permission } from './permission.entity';
import { User } from './user.entity';

@Entity('user_permission')
export class UserPermission extends BaseEntity {
  @ManyToOne(() => User, (user: User) => user.userPermission)
  user: User

  @ManyToOne(() => Permission, (permission: Permission) => permission.userPermissions)
  permission: Permission

  @Column({
    type: 'enum',
    enum: UserPermissionStatus,
    default: UserPermissionStatus.DELETE
  })
  @IsIn(enumToArray(UserPermissionStatus))
  @ApiProperty({ enum: UserPermissionStatus })
  status: string
}
