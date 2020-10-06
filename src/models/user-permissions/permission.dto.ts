// eslint-disable-next-line max-classes-per-file
import { ApiProperty } from '@nestjs/swagger';
import { UserPermissionStatus } from '@src/common/enums/userPermissionStatus.enum';

export class AddDeletePermissions {
  data: AddDeletePermission[]
}

class AddDeletePermission {
  @ApiProperty({ example: { id: 2 } })
  user: {
    id: number
  };

  @ApiProperty({ example: { id: 2 } })
  permission: {
    id: number
  }

}
