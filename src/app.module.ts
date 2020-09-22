import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConnectionService } from './database/database-connection.service';
import { CategoryModule } from './app/category/category.module';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { ValidatorModule } from './validators/validator.module';
import { PropertyModule } from './app/property/property.module';
import { AmenityModule } from './app/amenity/amenity.module';
import { RoomModule } from './app/room/room.module';
import { DestinationModule } from './app/destination/destination.module';

@Module({
  imports: [
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
    DestinationModule
  ]
})
export class AppModule { }
