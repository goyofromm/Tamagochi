/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Tamagotchi } from 'clases/tamagotchi';
import { hungryState } from 'clases/hungryState';

const tamagotchi = new Tamagotchi(new hungryState()); //Arranca hambrientooo

tamagotchi.feed(); // Debe cambiar a HappyState
tamagotchi.cuddle(); // No debería pasar nada
tamagotchi.giveWater(); // No debería pasar nada

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();


