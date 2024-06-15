import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotoModule } from './photo/photo.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    PhotoModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: ['.development.env', '.env'],
      isGlobal: true,
      load: [configuration],
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
