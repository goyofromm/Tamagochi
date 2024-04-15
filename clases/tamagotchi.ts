/* eslint-disable prettier/prettier */
import { State } from './state';
import { happyState } from './happyState';
import { hungryState } from './hungryState';
import { thirstyState } from './thirstyState';
import { sadState } from './sadState';

export class Tamagotchi {
  private name: string;
  public currentState: State;
  private timer: NodeJS.Timeout;
  private strikes: number;

  constructor(newState: State) {
    this.currentState = newState;
    this.strikes = 0;
    this.name = 'Tamagotchi'
    this.startTimer();
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

    if (!(newState instanceof happyState)) {
      this.strikes++;
      if (this.strikes >= 4) {
        clearInterval(this.timer);
        console.log(`${this.name} ha muerto por acumular 4 strikes :(`);
        process.exit()
      }
    } else {
      this.strikes = 0; // Si se pone feliz, reinicia los strikes
      clearInterval(this.timer); // Detener el temporizador actual
      this.startTimer(); // Volver a iniciar el temporizador
    }
    console.log("Estado cambiado a " + newState.getStateName())
    console.log ("Strikes: " + this.strikes)

    this.currentState = newState;
    //console.log(newState.getStateName())
  }

  feed(): string {
    return this.currentState.feed(this);
  }

  giveWater() {
    return this.currentState.giveWater(this);
  }

  cuddle() {
    return this.currentState.cuddle(this);
  }

  private startTimer() {
    this.timer = setInterval(() => {
      if (this.currentState instanceof happyState) {
        this.changeState(new hungryState());
        this.currentState.getStateName()
      } else if (this.currentState instanceof hungryState) {
        this.changeState(new thirstyState());
        this.currentState.getStateName()
      } else if (this.currentState instanceof thirstyState) {
        this.changeState(new sadState());
        this.currentState.getStateName()
      } else {
        clearInterval(this.timer);
        console.log(`${this.name} ha muerto :(`);
        process.exit()
      }
    }, 5000); 
  }

  
}
