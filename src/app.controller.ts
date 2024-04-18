/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Headers, Param, Post, Put } from '@nestjs/common';

import { AppService } from './app.service';
import { User } from '../clases/users/user.entity';
//import { link } from 'fs';
//import { Stimuli } from '../clases/stimuli';

@Controller()
export class AppController {
  constructor(public appService: AppService) {}

  @Get('/user/login')
  async getUser(@Headers() headers: Record<string, string>) {
    //Si retorna 0 es proque el usuario exsite, y tiene tamagotchis
    //Si retorna 1 es proque el usuario exsite, y tiene NO tamagotchis
    //Si retorna 2 es proque el usuario NO exsite
    const user = headers['user'];
    const password = headers['password']; 
    const USER_NOT_FOUND = 2;
    const USER_WITHOUT_TAMAGOTCHIS = 1;
    const USER_WITH_TAMAGOTCHIS = 0;
    
    const res = await this.appService.getUser(user, password);
    
    if (res) {
      // Usuario encontrado
      if (res.tamagotchiList.length === 0) {
        //Llamo en el app service para que ponga la lista de tamagotchis vacia        
        return USER_WITHOUT_TAMAGOTCHIS;
      } else {
        //Llamo en el app service para que ponga la lista de tamagotchis cargada
        return USER_WITH_TAMAGOTCHIS;
      }
    } else {
      // Usuario no encontrado
      return USER_NOT_FOUND;
    }
  }

  @Get('/tam/timer')
  timer(){
    const res = this.appService.tamagotchi.Timer() 
    return res
  }

  @Get('/state/:stimuli') 
  setStimuli(
    @Param('stimuli') stimuli: string
  ): string {
    const response = this.appService.setState(stimuli)
    return response
  }

  @Put(':name')
  async setName(
    @Param('name') name: string
  ): Promise<string> {
    const response = await this.appService.setName(name)
    return response
  }

  @Post('/register')
  async createrUser(@Body() newUser:User) {
    const response = await this.appService.createUser(newUser)
    return response
  }
}
