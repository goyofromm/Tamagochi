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
  let appController: AppController;
  let appService: AppService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService,            
        {
          provide: getRepositoryToken(Tamagotchi),
          useClass: Repository,
        }],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('HungryState', () => {
    it('should return "Feliz"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new hungryState()); 
      expect(appController.setStimuli('Feed')).toStrictEqual({Status:"Feliz"});
    });

    it('should return "Hambriento"', () => {
       appController.appService.tamagotchi = new Tamagotchi(new hungryState()); 
        expect(appController.setStimuli('Cuddle')).toStrictEqual({Status:"Hambriento"});
    });

    it('should return "Hambriento"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new hungryState()); 
        expect(appController.setStimuli('giveWater')).toStrictEqual({Status:"Hambriento"});
    });

    it('should return "Estimulo invalido"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new hungryState()); 
        expect(appController.setStimuli('asdasdasd')).toBe('Estimulo invalido');
    });
  });


  describe('SadState', () => {
    it('should return "Feliz"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new sadState()); 
      expect(appController.setStimuli('Cuddle')).toStrictEqual({Status:"Feliz"});
    });

    it('should return "Triste"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new sadState()); 
        expect(appController.setStimuli('Feed')).toStrictEqual({Status:"Triste"});
    });

    it('should return "Triste"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new sadState()); 
        expect(appController.setStimuli('giveWater')).toStrictEqual({Status:"Triste"});
    });

    it('should return "Estimulo invalido"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new sadState()); 
        expect(appController.setStimuli('asdasdasd')).toBe('Estimulo invalido');
    });

  });

  describe('HappyState', () => {
    it('should return "Feliz"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new happyState()); 
      expect(appController.setStimuli('Feed')).toStrictEqual({Status:"Feliz"});
    });

    it('should return "Feliz"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new happyState()); 
        expect(appController.setStimuli('giveWater')).toStrictEqual({Status:"Feliz"});
    });

    it('should return "Feliz"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new happyState()); 
        expect(appController.setStimuli('cuddle')).toStrictEqual({Status:"Feliz"});
    });

    it('should return "Estimulo invalido"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new happyState()); 
        expect(appController.setStimuli('sarasa')).toBe('Estimulo invalido');
    });

  });

  describe('thirstyState', () => {
    it('should return "Sediento"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new thirstyState()); 
      expect(appController.setStimuli('feed')).toStrictEqual({Status:"Sediento"});
    });

    it('should return "Feliz"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new thirstyState()); 
        expect(appController.setStimuli('giveWater')).toStrictEqual({Status:"Feliz"});
    });

    it('should return "Sediento"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new thirstyState()); 
        expect(appController.setStimuli('cuddle')).toStrictEqual({Status:"Sediento"});
    });

    it('should return "Estimulo invalido"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new thirstyState()); 
        expect(appController.setStimuli('buscando money')).toBe('Estimulo invalido');
    });
  });

  describe('deadState', () => {
    it('should return "Muerto"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new deadState()); 
      expect(appController.setStimuli('feed')).toStrictEqual({Status:"Muerto"});
    });

    it('should return "Muerto"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new deadState()); 
        expect(appController.setStimuli('giveWater')).toStrictEqual({Status:"Muerto"});
    });

    it('should return "Muerto"', () => {
      appController.appService.tamagotchi = new Tamagotchi(new deadState()); 
        expect(appController.setStimuli('cuddle')).toStrictEqual({Status:"Muerto"});
    });

    it('should return "Feliz"', () => {
        appController.appService.tamagotchi = new Tamagotchi(new deadState()); 
        expect(appController.setStimuli('revive')).toStrictEqual({Status:"Feliz"});
    });


    it('should return "Estimulo invalido"', () => {
        appController.appService.tamagotchi = new Tamagotchi(new deadState()); 
        expect(appController.setStimuli('buscando money')).toBe('Estimulo invalido');
    });
  });

  describe('setName', () => {
    it('should call setName and return response', async () => {
      const name = 'Testing';
      const expectedResponse = 'Tu nuevo nombre de tamagotchi es: Testing';
      jest.spyOn(appService, 'setName').mockResolvedValue(expectedResponse);
      
      const result = await appController.setName(name);
      
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('timer', () => {
    it('should return Feliz', () => {
       expect(appController.timer()).toStrictEqual({Status:"Hambriento"});
       expect(appController.timer()).toStrictEqual({Status:"Sediento"});
       expect(appController.timer()).toStrictEqual({Status:"Triste"});
       expect(appController.timer()).toStrictEqual({Status:"Muerto"});
    });
  });


});
