// import { SetMetadata } from '@nestjs/common';

// export const Methods = (method: string) => SetMetadata('methods', method);

import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export function Methods(...method: string[]) {
  return applyDecorators(
    SetMetadata('methods', method),
    UseGuards(JwtAuthGuard),
    UseGuards(RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' })
  );
}
