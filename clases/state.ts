/* eslint-disable prettier/prettier */
import { Tamagotchi } from './tamagotchi';

export abstract class State {
  abstract feed(tamagotchi: Tamagotchi): void;
  abstract giveWater(tamagotchi: Tamagotchi): void;
  abstract cuddle(tamagotchi: Tamagotchi): void;
}