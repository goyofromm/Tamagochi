/* eslint-disable prettier/prettier */
import { State } from './state';
import { happyState } from './happyState';
//import { hungryState } from './hungryState';
//import { thirstyState } from './thirstyState';
//import { sadState } from './sadState';
//import { deadState } from './deadState';

export class Tamagotchi {
  private name: string;
  public currentState: State;

  constructor(newState: State) {
    this.currentState = newState;
    this.name = 'Tamagotchi'
  }

  public setName(name : string): string{
    this.name = name
    console.log("Tu nuevo nombre de tamagotchi es " + name)
    return 'Tu nuevo nombre de tamagotchi es: ' + name    
  } 

  public changeState(newState: State) {
    if (newState === this.currentState) {
      return; // No cambia de estado si es el mismo estado
    }
    this.currentState = newState;

    console.log("Estado cambiado a " + this.currentState.name)
  }

  feed() {
    return this.currentState.feed(this);
  }

  giveWater() {
    return this.currentState.giveWater(this);
  }

  cuddle() {
    return this.currentState.cuddle(this);
  }

  reviveTamagotchi(){
    const hs = new happyState();
    this.changeState(hs)
    return {Status: this.currentState.name}
  }

  Timer() {
      this.changeState(this.currentState.changeState())
      return this.currentState.getStateName()
  }
  
}
