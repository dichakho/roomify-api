import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './database/database-connection.service';
import { CategoryModule } from './app/category/category.module';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { ValidatorModule } from './validators/validator.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService
    }),
    CategoryModule,
    UserModule,
    AuthModule,
    ValidatorModule
  ]
})
export class AppModule {}
