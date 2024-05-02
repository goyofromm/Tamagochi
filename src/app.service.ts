/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { happyState } from '../clases/happyState';
import { Tamagotchi } from '../clases/tamagotchi.entity';
import { Repository } from 'typeorm';
import { User } from '../clases/users/user.entity';
import { thirstyState } from '../clases/thirstyState';
import { hungryState } from '../clases/hungryState';
import { sadState } from '../clases/sadState';
import { deadState } from '../clases/deadState';


@Injectable()
export class AppService {
  
  constructor(
    @InjectRepository(Tamagotchi) public tamRepository: Repository<Tamagotchi>,
    @InjectRepository(User) public userRepository: Repository<User>
  ) {}

  pUser = new User()
  tamagotchi = new Tamagotchi(new happyState()); //Arranca feliz

  async setState(stimuli: string, idTam: number) : Promise<string> {
    let response
    if(stimuli.toLowerCase() == 'Feed'.toLowerCase()){
      response = this.tamagotchi.feed()
    }
    else if(stimuli.toLowerCase() == 'Cuddle'.toLowerCase()){
      response = this.tamagotchi.cuddle()
    }
    else if(stimuli.toLowerCase() == 'giveWater'.toLowerCase()){
      response = this.tamagotchi.giveWater()
    }
    else if(stimuli.toLowerCase() == 'revive'.toLowerCase()){
      response = this.tamagotchi.reviveTamagotchi()
    }
    else{
      response = 'Estimulo invalido'
    }
    if(response != 'Estimulo invalido'){
      await this.tamRepository.update({ id: idTam }, { currentState: response.Status })
    }
    return response
  }

  async Timer(idTam: number, currentState: string) {
    if(currentState == 'Feliz')
      this.tamagotchi.currentState = new happyState()
    else if(currentState == 'Hambriento')
      this.tamagotchi.currentState = new hungryState()
    else if(currentState == 'Sediento')
      this.tamagotchi.currentState = new thirstyState()
    else if(currentState == 'Triste')
      this.tamagotchi.currentState = new sadState()
    else if(currentState == 'Muerto')
      this.tamagotchi.currentState = new deadState()

    const response : any = await this.tamagotchi.changeState(this.tamagotchi.currentState.changeState())
    if(response){
      await this.tamRepository.update({ id: idTam }, { currentState: response.Status })
    }
    return response
  }

  //El testing me da error, y creo que es aca
  async setName(name: string): Promise<string> {

    await this.tamRepository.update({ id: 1 }, { name: name });
    return this.tamagotchi.setName(name);
  }

  createUser(user: User){
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  createTam(tam: Tamagotchi){
    tam.idUser = this.pUser.id
    const newTam = this.tamRepository.create(tam);
    return this.tamRepository.save(newTam);
  }

  async getUser(username, password){
    this.pUser = await this.userRepository.findOne({
      where: {
          name: username,
          password: password
      }
    });
    if(this.pUser){ //Si el usuario existe, cargo todos los tamagotchis que tenga ese usuario
      this.pUser.tamagotchiList = await this.tamRepository.find({
        where: {
          idUser: this.pUser.id
        }
      })
      return this.pUser
    }
    else{
      return null
    }
  }


}
