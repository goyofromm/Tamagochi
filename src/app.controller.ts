/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
//import { link } from 'fs';
//import { Stimuli } from '../clases/stimuli';

@Controller()
export class AppController {
  constructor(public appService: AppService) {}

  @Get(':stimuli')
  setStimuli(
    @Param('stimuli') stimuli: string
  ): string {
    const response = this.appService.setState(stimuli)
    return response
  }
}
