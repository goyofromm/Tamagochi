/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Tamagotchi } from '../clases/tamagotchi';
import { hungryState } from '../clases/hungryState';
import { sadState } from '../clases/sadState';
import { thirstyState } from '../clases/thirstyState';
import { happyState } from '../clases/happyState';


describe('AppController', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });


  describe('HungryState', () => {
    it('should return "Se pone Feliz"', () => {
      appService.tamagotchi = new Tamagotchi(new hungryState()); 
      expect(appService.setState('Feed')).toBe('Se pone feliz');
    });

    it('should return "No pasa nada"', () => {
        appService.tamagotchi = new Tamagotchi(new hungryState()); 
        expect(appService.setState('Cuddle')).toBe('No pasa nada');
    });

    it('should return "No pasa nada"', () => {
        appService.tamagotchi = new Tamagotchi(new hungryState()); 
        expect(appService.setState('giveWater')).toBe('No pasa nada');
    });

    it('should return "Estimulo invalido"', () => {
        appService.tamagotchi = new Tamagotchi(new hungryState()); 
        expect(appService.setState('asdasdasd')).toBe('Estimulo invalido');
    });
  });


  describe('SadState', () => {
    it('should return "Se pone Feliz"', () => {
      appService.tamagotchi = new Tamagotchi(new sadState()); 
      expect(appService.setState('Cuddle')).toBe('Se pone feliz');
    });

    it('should return "Beep, Beep - Vomita"', () => {
        appService.tamagotchi = new Tamagotchi(new sadState()); 
        expect(appService.setState('Feed')).toBe('Beep, Beep - Vomita');
    });

    it('should return "Beep, Beep, Beep - Tilda display"', () => {
        appService.tamagotchi = new Tamagotchi(new sadState()); 
        expect(appService.setState('giveWater')).toBe('Beep, Beep, Beep - Tilda display');
    });

    it('should return "Estimulo invalido"', () => {
        appService.tamagotchi = new Tamagotchi(new sadState()); 
        expect(appService.setState('asdasdasd')).toBe('Estimulo invalido');
    });

  });

  describe('HappyState', () => {
    it('should return "No pasa nada"', () => {
      appService.tamagotchi = new Tamagotchi(new happyState()); 
      expect(appService.setState('Feed')).toBe('No pasa nada');
    });

    it('should return "Beep beep beep beep beep"', () => {
        appService.tamagotchi = new Tamagotchi(new happyState()); 
        expect(appService.setState('giveWater')).toBe('Beep beep beep beep beep');
    });

    it('should return "No pasa nada"', () => {
        appService.tamagotchi = new Tamagotchi(new happyState()); 
        expect(appService.setState('cuddle')).toBe('No pasa nada');
    });

    it('should return "Estimulo invalido"', () => {
        appService.tamagotchi = new Tamagotchi(new happyState()); 
        expect(appService.setState('sarasa')).toBe('Estimulo invalido');
    });

  });

  describe('thirstyState', () => {
    it('should return "No pasa nada"', () => {
      appService.tamagotchi = new Tamagotchi(new thirstyState()); 
      expect(appService.setState('feed')).toBe('No pasa nada');
    });

    it('should return "Se pone feliz"', () => {
        appService.tamagotchi = new Tamagotchi(new thirstyState()); 
        expect(appService.setState('giveWater')).toBe('Se pone feliz');
    });

    it('should return "No pasa nada"', () => {
        appService.tamagotchi = new Tamagotchi(new thirstyState()); 
        expect(appService.setState('cuddle')).toBe('No pasa nada');
    });

    it('should return "Estimulo invalido"', () => {
        appService.tamagotchi = new Tamagotchi(new thirstyState()); 
        expect(appService.setState('buscando money')).toBe('Estimulo invalido');
    });
  });
  
});
