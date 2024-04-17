/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { hungryState } from '../clases/hungryState';
//import { sadState } from '../clases/sadState';
//import { thirstyState } from '../clases/thirstyState';
import { happyState } from '../clases/happyState';
import { Tamagotchi } from '../clases/tamagotchi.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AppService {
  
  constructor(@InjectRepository(Tamagotchi) public tamRepository: Repository<Tamagotchi>) {}

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

  //El testing me da error, y creo que es aca
  async setName(name: string): Promise<string> {

    //await this.tamRepository.update({ id: 1 }, { name: name });
    return this.tamagotchi.setName(name);
  }


}
