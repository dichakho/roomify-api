import { forwardRef, Global, Module } from '@nestjs/common';
import { DestinationModule } from '@src/app/destination/destination.module';
import { UniqueUsernameValidator } from './auth/unique-username.validator';
import { UserModule } from '../app/user/user.module';
import { UniquePhoneValidator } from './auth/unique-phone.validator';
import { TokenIDValidator } from './auth/tokenID.validator';
import { ExistedDestinationValidator } from './property/exist-destination.validator';
import { ExistedPropertyValidator } from './favorite-property/existedProperty.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationRepository } from '@src/app/destination/destination.repository';

@Global()
@Module({
  imports: [
    forwardRef(() => UserModule),
    DestinationModule,
    TypeOrmModule.forFeature([DestinationRepository])
  ],
  providers: [
    UniqueUsernameValidator,
    UniquePhoneValidator,
    TokenIDValidator,
    ExistedDestinationValidator,
    ExistedPropertyValidator
  ],
  exports: [
    UniqueUsernameValidator,
    UniquePhoneValidator,
    TokenIDValidator,
    ExistedDestinationValidator,
    ExistedPropertyValidator
  ]
})
export class ValidatorModule {
}
