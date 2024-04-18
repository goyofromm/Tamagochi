/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tamagotchi } from '../clases/tamagotchi.entity';
import { User } from 'clases/users/user.entity';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: "mysql",
    username: "root",
    host: "localhost",
    password: "$Bidcom123",
    port: 3306,
    database: "tamagotchi_game",
    autoLoadEntities: true,
    synchronize: true
  }), TypeOrmModule.forFeature([Tamagotchi, User])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
