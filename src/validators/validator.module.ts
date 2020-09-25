import { Global, Module } from '@nestjs/common';
import { UniqueUsernameValidator } from './auth/unique-username.validator';
import { UserModule } from '../app/user/user.module';
import { UniquePhoneValidator } from './auth/unique-phone.validator';

@Global()
@Module({
  imports: [
    UserModule
  ],
  providers: [
    UniqueUsernameValidator,
    UniquePhoneValidator
  ],
  exports: [
    UniqueUsernameValidator,
    UniquePhoneValidator
  ]
})
export class ValidatorModule {
}
