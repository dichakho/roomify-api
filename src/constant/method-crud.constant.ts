import { UseGuards } from '@nestjs/common';
import { HierarchyGuard } from '@src/common/guards/hierarchy.guard';
import { MethodName } from '../common/enums/methods.enum';
import { Methods } from '../common/decorators/methods.decorator';

export const method = {
  getOneBase: {
    decorators: [Methods(MethodName.GET)]
  },
  getManyBase: {
    decorators: [Methods(MethodName.GET_LIST)]
  },
  deleteOneBase: {
    decorators: [Methods(MethodName.DELETE)]
  },
  replaceOneBase: {
    decorators: [Methods(MethodName.PUT)]
  },
  updateOneBase: {
    decorators: [Methods(MethodName.PATCH)]
  },
  createOneBase: {
    decorators: [Methods(MethodName.POST)]
  },
  createManyBase: {
    decorators: [Methods(MethodName.POST)]
  }
};
