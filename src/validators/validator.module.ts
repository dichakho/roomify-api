import { Global, Module } from '@nestjs/common';
import { UniqueUsernameValidator } from './auth/unique-username.validator';
import { UserModule } from '../app/user/user.module';

@Global()
@Module({
  imports: [
    UserModule
  ],
  providers: [
    UniqueUsernameValidator

  ],
  exports: [
    UniqueUsernameValidator
  ]
})
export class ValidatorModule {
}
