/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Headers, Param, Post, Put } from '@nestjs/common';

import { AppService } from './app.service';
import { User } from '../clases/users/user.entity';
import { Tamagotchi } from '../clases/tamagotchi.entity';
//import { link } from 'fs';
//import { Stimuli } from '../clases/stimuli';

@Controller()
export class AppController {
  constructor(public appService: AppService) {}

  @Get('/user/login')
  async getUser(@Headers() headers: Record<string, string>) {
    //Este endpoint es para el login de usuarios
    //Si retorna 0 es proque el usuario exsite, y tiene tamagotchis
    //Si retorna 1 es proque el usuario exsite, y NO tiene tamagotchis
    //Si retorna 2 es proque el usuario NO exsite
    const user = headers['user'];
    const password = headers['password']; 
    
    const res = await this.appService.getUser(user, password);
    return res
  }

  @Get('/tam/timer/:id/:state')
  timer(
    @Param('id') idTam: number,
    @Param('state') currentState: string
  ){
    //Este endpoint es para el cambio automatico de estado con el timer
    const res = this.appService.Timer(idTam, currentState) 
    return res
  }

  @Get('/state/:stimuli/:id') 
  setStimuli(
    @Param('stimuli') stimuli: string,
    @Param('id') idTam: number,
  ) {
    //Este endpoint es para el cambio de estado tras darle un estimulo al tamagotchi
    const response = this.appService.setState(stimuli, idTam)
    return response
  }

  @Put(':name')
  async setName(
    @Param('name') name: string
  ): Promise<string> {
    //Este endpoint es para cambiar el nombre de un tamagotchi
    const response = await this.appService.setName(name)
    return response
  }

  @Post('/register')
  async createrUser(@Body() newUser:User) {
    //Este endpoint es para crear usuarios
    const response = await this.appService.createUser(newUser)
    return response
  }

  @Post('/register/tam')
  async createrTam(@Body() newTam:Tamagotchi) {
    //Este endpoint es para crear tamagotchis
    const response = await this.appService.createTam(newTam)
    return response
    
  }
}
