/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Tamagotchi } from '../clases/tamagotchi';
import { hungryState } from '../clases/hungryState';
import { sadState } from '../clases/sadState';
import { thirstyState } from 'clases/thirstyState';
import { happyState } from 'clases/happyState';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('HungryState', () => {
    it('should return "Se pone Feliz"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new hungryState()); 
      expect(appController.setStimuli('Feed')).toBe('Se pone feliz');
    });

    it('should return "No pasa nada"', () => {
       appController.appService.tamagotchi = new Tamagotchi(new hungryState()); 
        expect(appController.setStimuli('Cuddle')).toBe('No pasa nada');
    });

    it('should return "No pasa nada"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new hungryState()); 
        expect(appController.setStimuli('giveWater')).toBe('No pasa nada');
    });

    it('should return "Estimulo invalido"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new hungryState()); 
        expect(appController.setStimuli('asdasdasd')).toBe('Estimulo invalido');
    });
  });


  describe('SadState', () => {
    it('should return "Se pone Feliz"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new sadState()); 
      expect(appController.setStimuli('Cuddle')).toBe('Se pone feliz');
    });

    it('should return "Beep, Beep - Vomita"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new sadState()); 
        expect(appController.setStimuli('Feed')).toBe('Beep, Beep - Vomita');
    });

    it('should return "Beep, Beep, Beep - Tilda display"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new sadState()); 
        expect(appController.setStimuli('giveWater')).toBe('Beep, Beep, Beep - Tilda display');
    });

    it('should return "Estimulo invalido"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new sadState()); 
        expect(appController.setStimuli('asdasdasd')).toBe('Estimulo invalido');
    });

  });

  describe('HappyState', () => {
    it('should return "No pasa nada"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new happyState()); 
      expect(appController.setStimuli('Feed')).toBe('No pasa nada');
    });

    it('should return "Beep beep beep beep beep"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new happyState()); 
        expect(appController.setStimuli('giveWater')).toBe('Beep beep beep beep beep');
    });

    it('should return "No pasa nada"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new happyState()); 
        expect(appController.setStimuli('cuddle')).toBe('No pasa nada');
    });

    it('should return "Estimulo invalido"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new happyState()); 
        expect(appController.setStimuli('sarasa')).toBe('Estimulo invalido');
    });

  });

  describe('thirstyState', () => {
    it('should return "No pasa nada"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new thirstyState()); 
      expect(appController.setStimuli('feed')).toBe('No pasa nada');
    });

    it('should return "Se pone feliz"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new thirstyState()); 
        expect(appController.setStimuli('giveWater')).toBe('Se pone feliz');
    });

    it('should return "No pasa nada"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new thirstyState()); 
        expect(appController.setStimuli('cuddle')).toBe('No pasa nada');
    });

    it('should return "Estimulo invalido"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new thirstyState()); 
        expect(appController.setStimuli('buscando money')).toBe('Estimulo invalido');
    });
  });
});
