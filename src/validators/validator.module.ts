import { Global, Module } from '@nestjs/common';
import { DestinationModule } from '@src/app/destination/destination.module';
import { UniqueUsernameValidator } from './auth/unique-username.validator';
import { UserModule } from '../app/user/user.module';
import { UniquePhoneValidator } from './auth/unique-phone.validator';
import { TokenIDValidator } from './auth/tokenID.validator';
import { ExistedDestinationValidator } from './property/exist-destination.validator';

@Global()
@Module({
  imports: [
    UserModule,
    DestinationModule
  ],
  providers: [
    UniqueUsernameValidator,
    UniquePhoneValidator,
    TokenIDValidator,
    ExistedDestinationValidator
  ],
  exports: [
    UniqueUsernameValidator,
    UniquePhoneValidator,
    TokenIDValidator,
    ExistedDestinationValidator
  ]
})
export class ValidatorModule {
}
