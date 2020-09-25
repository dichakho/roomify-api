import { Global, Module } from '@nestjs/common';
import { UniqueUsernameValidator } from './auth/unique-username.validator';
import { UserModule } from '../app/user/user.module';
import { UniquePhoneValidator } from './auth/unique-phone.validator';
import { TokenIDValidator } from './auth/tokenID.validator';

@Global()
@Module({
  imports: [
    UserModule
  ],
  providers: [
    UniqueUsernameValidator,
    UniquePhoneValidator,
    TokenIDValidator
  ],
  exports: [
    UniqueUsernameValidator,
    UniquePhoneValidator,
    TokenIDValidator
  ]
})
export class ValidatorModule {
}
