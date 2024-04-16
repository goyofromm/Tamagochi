/* eslint-disable prettier/prettier */
import { Tamagotchi } from './tamagotchi';

export abstract class State {
  abstract name : string
  abstract feed(tamagotchi: Tamagotchi): string;
  abstract giveWater(tamagotchi: Tamagotchi): string;
  abstract cuddle(tamagotchi: Tamagotchi): string;
  abstract getStateName(): string;
  abstract changeState(): State;
}