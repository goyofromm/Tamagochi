/* eslint-disable prettier/prettier */
import { Tamagotchi } from "../tamagotchi.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
  dateCreated: Date;

  public tamagotchiList: Tamagotchi[] //Cada usuario tiene su lista de tamagotchi registrados

}