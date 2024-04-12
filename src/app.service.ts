/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { hungryState } from '../clases/hungryState';
import { sadState } from '../clases/sadState';
import { thirstyState } from '../clases/thirstyState';
import { happyState } from '../clases/happyState';
import { Tamagotchi } from '../clases/tamagotchi';


@Injectable()
export class AppService {
  
  tamagotchi = new Tamagotchi(new hungryState()); //Arranca hambrientooo

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
    else{
      response = 'Estimulo invalido'
    }
    return response
  }
}
