import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import config from 'config';
import { UserRepository } from '@src/user/user.repository';
import _ from 'lodash';

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
      relations: ['roles', 'roles.permissions']
    });
    const permissions = [];
    userPermissions.roles.map((u: any) => {
      u.permissions.map((p: any) => {
        permissions.push(`${p.module.name}_${p.method.name}`);
      });
    });
    return { id: payload.id, username: payload.username, permissions };
  }
}
