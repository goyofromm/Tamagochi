/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Tamagotchi } from '../clases/tamagotchi.entity';
import { hungryState } from '../clases/hungryState';
import { sadState } from '../clases/sadState';
import { thirstyState } from '../clases/thirstyState';
import { happyState } from '../clases/happyState';
import { deadState } from '../clases/deadState';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';


describe('AppController', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService,            
        {
          provide: getRepositoryToken(Tamagotchi),
          useClass: Repository,
        }],
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

  describe('deadState', () => {
    it('should return "Sediento"', () => {
      appService.tamagotchi = new Tamagotchi(new deadState()); 
      expect(appService.setState('feed')).toStrictEqual({Status:"Muerto"});
    });

    it('should return "Feliz"', () => {
        appService.tamagotchi = new Tamagotchi(new deadState()); 
        expect(appService.setState('giveWater')).toStrictEqual({Status:"Muerto"});
    });

    it('should return "Sediento"', () => {
        appService.tamagotchi = new Tamagotchi(new deadState()); 
        expect(appService.setState('cuddle')).toStrictEqual({Status:"Muerto"});
    });

    it('should return "Sediento"', () => {
      appService.tamagotchi = new Tamagotchi(new deadState()); 
      expect(appService.tamagotchi.reviveTamagotchi()).toStrictEqual({Status:"Feliz"});
    });

    it('should return "Estimulo invalido"', () => {
        appService.tamagotchi = new Tamagotchi(new deadState()); 
        expect(appService.setState('buscando money')).toBe('Estimulo invalido');
    });
  });

  describe('setName', () => {
    it('should set the name of the tamagotchi and return a message', () => {
      const name = 'Testing';
      const expectedResponse = 'Tu nuevo nombre de tamagotchi es: Testing';

      const result = appService.setName(name);
      expect(appService.tamagotchi.getName()).toEqual(name);
      expect(result).toEqual(expectedResponse);
    });
  });
  
});
