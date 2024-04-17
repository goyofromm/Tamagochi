/* eslint-disable prettier/prettier */
import { State } from './state';
import { happyState } from './happyState';
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'tamagotchi'})
export class Tamagotchi {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column({unique: true})
  name: string;

  @Column({type: 'varchar'})
  currentState: State;

  @Column()
  dateCreated: Date;

  @Column({default: 3})
  lifes: number;

  constructor(newState: State, ) {
    this.currentState = newState;
    this.name = 'Tamagotchi'
  }

  public getName() : string{
    return this.name
  }

  public changeState(newState: State) {
    if (newState === this.currentState) {
      return; // No cambia de estado si es el mismo estado
    }
    this.currentState = newState;

    console.log("Estado cambiado a " + this.currentState.name)
  }

  feed() {
    return this.currentState.feed(this);
  }

  giveWater() {
    return this.currentState.giveWater(this);
  }

  cuddle() {
    return this.currentState.cuddle(this);
  }

  reviveTamagotchi(){
    const hs = new happyState();
    this.changeState(hs)
    return {Status: this.currentState.name}
  }

  Timer() {
      this.changeState(this.currentState.changeState())
      return this.currentState.getStateName()
  }

  public setName(name : string): string{
    this.name = name
    console.log("Tu nuevo nombre de tamagotchi es " + name)
    return 'Tu nuevo nombre de tamagotchi es: ' + name    
  } 

}
