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
    
    const res = await this.appService.getUser(user, password);
    return res
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
