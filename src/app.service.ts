/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
//import { hungryState } from '../clases/hungryState';
//import { sadState } from '../clases/sadState';
//import { thirstyState } from '../clases/thirstyState';
import { happyState } from '../clases/happyState';
import { Tamagotchi } from '../clases/tamagotchi';


@Injectable()
export class AppService {
  
  tamagotchi = new Tamagotchi(new happyState()); //Arranca feliz

  setState(stimuli: string): string {
    let response
    if(stimuli.toLowerCase() == 'Feed'.toLowerCase()){
      response = this.tamagotchi.feed()
    }
    else if(stimuli.toLowerCase() == 'Cuddle'.toLowerCase()){
      response = this.tamagotchi.cuddle()
    }
    else if(stimuli.toLowerCase() == 'giveWater'.toLowerCase()){
      response = this.tamagotchi.giveWater()
    }
    else if(stimuli.toLowerCase() == 'revive'.toLowerCase()){
      response = this.tamagotchi.reviveTamagotchi()
    }
    else{
      response = 'Estimulo invalido'
    }
    return response
  }

  setName(name:string): string{
    return this.tamagotchi.setName(name);
  }

  /*getState(): string{
    return this.tamagotchi.currentState.getStateName()
  }*/

}
