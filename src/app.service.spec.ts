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
    it('should return "Feliz"', () => {
      appService.tamagotchi = new Tamagotchi(new hungryState()); 
      expect(appService.setState('Feed')).toStrictEqual({Status:"Feliz"});
    });

    it('should return "Hambriento"', () => {
        appService.tamagotchi = new Tamagotchi(new hungryState()); 
        expect(appService.setState('Cuddle')).toStrictEqual({Status:"Hambriento"});
    });

    it('should return "Hambriento"', () => {
        appService.tamagotchi = new Tamagotchi(new hungryState()); 
        expect(appService.setState('giveWater')).toStrictEqual({Status:"Hambriento"});
    });

    it('should return "Estimulo invalido"', () => {
        appService.tamagotchi = new Tamagotchi(new hungryState()); 
        expect(appService.setState('asdasdasd')).toBe('Estimulo invalido');
    });
  });


  describe('SadState', () => {
    it('should return "Feliz"', () => {
      appService.tamagotchi = new Tamagotchi(new sadState()); 
      expect(appService.setState('Cuddle')).toStrictEqual({Status:"Feliz"});
    });

    it('should return "Triste"', () => {
        appService.tamagotchi = new Tamagotchi(new sadState()); 
        expect(appService.setState('Feed')).toStrictEqual({Status:"Triste"});
    });

    it('should return "Triste"', () => {
        appService.tamagotchi = new Tamagotchi(new sadState()); 
        expect(appService.setState('giveWater')).toStrictEqual({Status:"Triste"});
    });

    it('should return "Estimulo invalido"', () => {
        appService.tamagotchi = new Tamagotchi(new sadState()); 
        expect(appService.setState('asdasdasd')).toBe('Estimulo invalido');
    });

  });

  describe('HappyState', () => {
    it('should return "Feliz"', () => {
      appService.tamagotchi = new Tamagotchi(new happyState()); 
      expect(appService.setState('Feed')).toStrictEqual({Status:"Feliz"});
    });

    it('should return "Feliz"', () => {
        appService.tamagotchi = new Tamagotchi(new happyState()); 
        expect(appService.setState('giveWater')).toStrictEqual({Status:"Feliz"});
    });

    it('should return "Feliz"', () => {
        appService.tamagotchi = new Tamagotchi(new happyState()); 
        expect(appService.setState('cuddle')).toStrictEqual({Status:"Feliz"});
    });

    it('should return "Estimulo invalido"', () => {
        appService.tamagotchi = new Tamagotchi(new happyState()); 
        expect(appService.setState('sarasa')).toBe('Estimulo invalido');
    });

  });

  describe('thirstyState', () => {
    it('should return "Sediento"', () => {
      appService.tamagotchi = new Tamagotchi(new thirstyState()); 
      expect(appService.setState('feed')).toStrictEqual({Status:"Sediento"});
    });

    it('should return "Feliz"', () => {
        appService.tamagotchi = new Tamagotchi(new thirstyState()); 
        expect(appService.setState('giveWater')).toStrictEqual({Status:"Feliz"});
    });

    it('should return "Sediento"', () => {
        appService.tamagotchi = new Tamagotchi(new thirstyState()); 
        expect(appService.setState('cuddle')).toStrictEqual({Status:"Sediento"});
    });

    it('should return "Estimulo invalido"', () => {
        appService.tamagotchi = new Tamagotchi(new thirstyState()); 
        expect(appService.setState('buscando money')).toBe('Estimulo invalido');
    });
  });
  
});
