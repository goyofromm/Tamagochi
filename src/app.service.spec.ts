/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { User } from '../clases/users/user.entity';
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

  const userRepository = {
    provide: getRepositoryToken(User),
    useClass: Repository,
  };
  
  const tamagotchiRepository = {
    provide: getRepositoryToken(Tamagotchi),
    useClass: Repository,
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, tamagotchiRepository, userRepository],
    }).compile();

    appService = app.get<AppService>(AppService);
  });


  describe('HungryState', () => {
    it('should return "Feliz"', () => {
      appService.tamagotchi = new Tamagotchi(new hungryState()); 
      expect(appService.setState('Feed', 1)).toStrictEqual({Status:"Feliz"});
    });

    it('should return "Hambriento"', () => {
        appService.tamagotchi = new Tamagotchi(new hungryState()); 
        expect(appService.setState('Cuddle', 1)).toStrictEqual({Status:"Hambriento"});
    });

    it('should return "Hambriento"', () => {
        appService.tamagotchi = new Tamagotchi(new hungryState()); 
        expect(appService.setState('giveWater', 1)).toStrictEqual({Status:"Hambriento"});
    });

    it('should return "Estimulo invalido"', () => {
        appService.tamagotchi = new Tamagotchi(new hungryState()); 
        expect(appService.setState('asdasdasd', 1)).toBe('Estimulo invalido');
    });
  });


  describe('SadState', () => {
    it('should return "Feliz"', () => {
      appService.tamagotchi = new Tamagotchi(new sadState()); 
      expect(appService.setState('Cuddle', 1)).toStrictEqual({Status:"Feliz"});
    });

    it('should return "Triste"', () => {
        appService.tamagotchi = new Tamagotchi(new sadState()); 
        expect(appService.setState('Feed', 1)).toStrictEqual({Status:"Triste"});
    });

    it('should return "Triste"', () => {
        appService.tamagotchi = new Tamagotchi(new sadState()); 
        expect(appService.setState('giveWater', 1)).toStrictEqual({Status:"Triste"});
    });

    it('should return "Estimulo invalido"', () => {
        appService.tamagotchi = new Tamagotchi(new sadState()); 
        expect(appService.setState('asdasdasd', 1)).toBe('Estimulo invalido');
    });

  });

  describe('HappyState', () => {
    it('should return "Feliz"', () => {
      appService.tamagotchi = new Tamagotchi(new happyState()); 
      expect(appService.setState('Feed', 1)).toStrictEqual({Status:"Feliz"});
    });

    it('should return "Feliz"', () => {
        appService.tamagotchi = new Tamagotchi(new happyState()); 
        expect(appService.setState('giveWater', 1)).toStrictEqual({Status:"Feliz"});
    });

    it('should return "Feliz"', () => {
        appService.tamagotchi = new Tamagotchi(new happyState()); 
        expect(appService.setState('cuddle', 1)).toStrictEqual({Status:"Feliz"});
    });

    it('should return "Estimulo invalido"', () => {
        appService.tamagotchi = new Tamagotchi(new happyState()); 
        expect(appService.setState('sarasa', 1)).toBe('Estimulo invalido');
    });

  });

  describe('thirstyState', () => {
    it('should return "Sediento"', () => {
      appService.tamagotchi = new Tamagotchi(new thirstyState()); 
      expect(appService.setState('feed', 1)).toStrictEqual({Status:"Sediento"});
    });

    it('should return "Feliz"', () => {
        appService.tamagotchi = new Tamagotchi(new thirstyState()); 
        expect(appService.setState('giveWater', 1)).toStrictEqual({Status:"Feliz"});
    });

    it('should return "Sediento"', () => {
        appService.tamagotchi = new Tamagotchi(new thirstyState()); 
        expect(appService.setState('cuddle', 1)).toStrictEqual({Status:"Sediento"});
    });

    it('should return "Estimulo invalido"', () => {
        appService.tamagotchi = new Tamagotchi(new thirstyState()); 
        expect(appService.setState('buscando money', 1)).toBe('Estimulo invalido');
    });
  });

  describe('deadState', () => {
    it('should return "Sediento"', () => {
      appService.tamagotchi = new Tamagotchi(new deadState()); 
      expect(appService.setState('feed', 1)).toStrictEqual({Status:"Muerto"});
    });

    it('should return "Feliz"', () => {
        appService.tamagotchi = new Tamagotchi(new deadState()); 
        expect(appService.setState('giveWater', 1)).toStrictEqual({Status:"Muerto"});
    });

    it('should return "Sediento"', () => {
        appService.tamagotchi = new Tamagotchi(new deadState()); 
        expect(appService.setState('cuddle', 1)).toStrictEqual({Status:"Muerto"});
    });

    it('should return "Sediento"', () => {
      appService.tamagotchi = new Tamagotchi(new deadState()); 
      expect(appService.tamagotchi.reviveTamagotchi()).toStrictEqual({Status:"Feliz"});
    });

    it('should return "Estimulo invalido"', () => {
        appService.tamagotchi = new Tamagotchi(new deadState()); 
        expect(appService.setState('buscando money', 1)).toBe('Estimulo invalido');
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
