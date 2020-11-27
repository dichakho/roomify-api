import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerRegistration } from '@src/entities/owner_registration.entity';
import { User } from '@src/entities/user.entity';
import { OwnerRegistrationController } from './owner-registration.controller';
import { OwnerRegistrationService } from './owner-registration.service';

@Module({
  imports: [TypeOrmModule.forFeature([OwnerRegistration, User])],
  controllers: [OwnerRegistrationController],
  providers: [OwnerRegistrationService]
})
export class OwnerRegistrationModule {}
