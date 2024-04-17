/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({default: 'CURRENT_TIMESTAMP'})
  dateCreated: Date;
}