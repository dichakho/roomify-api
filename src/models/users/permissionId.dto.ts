// eslint-disable-next-line max-classes-per-file
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class PermissionDTO {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ example: [2, 3] })
  permissionIds: number[]
}
