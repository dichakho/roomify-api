import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRepository } from '@src/app/user/user.repository';
import _ from 'lodash';

type TPermissions = {
  methods: Array<string>;
  modules: Array<string>;
};
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchPermissions(currentPermissions: Array<string>, requirePermissions: Array<string>): boolean {
    if (!_.isEmpty(_.intersection(requirePermissions, currentPermissions))) {
      return true;
    }
    return false;
  }

  canActivate(context: ExecutionContext): boolean {
    const methods = this.reflector.get<string[]>('methods', context.getHandler());
    console.log('METHODS ---->', methods);

    const modules = this.reflector.get<string[]>('modules', context.getClass());
    console.log('MODULES ---->', modules);

    const requirePermissions = [`${modules[0]}_${methods[0]}`];
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    return this.matchPermissions(user.permissions, requirePermissions);
  }
}
