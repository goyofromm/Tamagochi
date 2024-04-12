/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Put } from '@nestjs/common';
import { AppService } from './app.service';
//import { link } from 'fs';
//import { Stimuli } from '../clases/stimuli';

@Controller()
export class AppController {
  constructor(public appService: AppService) {}

  @Get('/tam/state')
  getState() : string{
    return this.appService.getState();
  }

  @Get(':stimuli')
  setStimuli(
    @Param('stimuli') stimuli: string
  ): string {
    const response = this.appService.setState(stimuli)
    return response
  }

  @Put(':name')
  setName(
    @Param('name') name: string
  ): string {
    const response = this.appService.setName(name)
    return response
  }
}
