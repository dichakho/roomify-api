import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConnectionService } from './database/database-connection.service';
import { CategoryModule } from './app/category/category.module';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { ValidatorModule } from './validators/validator.module';
import { PropertyModule } from './app/property/property.module';
import { AmenityModule } from './app/amenity/amenity.module';
import { RoomModule } from './app/room/room.module';
import { DestinationModule } from './app/destination/destination.module';
import { UserPermissionModule } from './app/user-permission/user-permission.module';
import { OwnerRegistrationModule } from './app/owner-registration/owner-registration.module';
import { BaseController } from './base.controller';
import { FavoritePropertyModule } from './app/favorite-property/favorite-property.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService
    }),
    CategoryModule,
    UserModule,
    AuthModule,
    ValidatorModule,
    PropertyModule,
    AmenityModule,
    RoomModule,
    DestinationModule,
    UserPermissionModule,
    OwnerRegistrationModule,
    FavoritePropertyModule
  ],
  controllers: [BaseController]
})
export class AppModule { }
