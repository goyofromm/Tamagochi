/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Tamagotchi } from 'clases/tamagotchi.entity';

import { AppService } from './app.service';
//import { link } from 'fs';
//import { Stimuli } from '../clases/stimuli';

@Controller()
export class AppController {
  constructor(public appService: AppService) {}

  /*@Get('/tam/state')
  getState() : string{
    return this.appService.getState() 
  }*/

  @Get('/tam/timer')
  timer(){
    const res = this.appService.tamagotchi.Timer() 
    return res
  }

  @Get(':stimuli')
  setStimuli(
    @Param('stimuli') stimuli: string
  ): string {
    const response = this.appService.setState(stimuli)
    return response
  }

  @Post(':name')
  async setName(
    @Param('name') name: string
  ): Promise<string> {
    const response = await this.appService.setName(name)
    return response
  }

  @Post('/register')
  async setName(): Promise<string> {
    const response = await this.appService.setName(name)
    return response
  }
}
