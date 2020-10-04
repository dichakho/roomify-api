import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import config from 'config';
import { UserRepository } from '@src/app/user/user.repository';
import _ from 'lodash';
import { Permission } from '@src/entities/permission.entity';
import { Role } from '@src/entities/roles.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret')
    });
  }

  async validate(payload: any) {
    const userPermissions = await this.userRepository.findOne({
      where: { id: payload.id },
      relations: ['roles', 'roles.permissions', 'userPermission']
    });
    const permissions = [];
    const deletedPermissions = [];
    userPermissions.userPermission.map(t => {
      if (t.status === 'DELETE') deletedPermissions.push(t.permission.id);
      else permissions.push(`${t.permission.module.name}_${t.permission.method.name}`);
    });
    userPermissions.roles.map((u: Role) => {
      u.permissions.map((p: Permission) => {
        if (deletedPermissions.length !== 0) {
          deletedPermissions.map(temp => {
            if (p.id !== temp) permissions.push(`${p.module.name}_${p.method.name}`);
          });
        }
        else {
          permissions.push(`${p.module.name}_${p.method.name}`);
        }

      });
    });
    userPermissions.password = undefined;
    userPermissions.createdAt = undefined;
    userPermissions.updatedAt = undefined;
    userPermissions.deletedAt = undefined;
    userPermissions.roles[0].permissions = undefined;
    userPermissions.userPermission = undefined;
    return { ...userPermissions, permissions };

  }
}
