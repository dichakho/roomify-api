import { User } from '@src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserPermission } from '@src/entities/user-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserPermission])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
