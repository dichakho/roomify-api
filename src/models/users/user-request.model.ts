import { Request } from 'express';
import { User } from '@src/entities/user.entity';

export interface UserRequest extends Request {
  user: User
}
