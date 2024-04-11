/* eslint-disable prettier/prettier */
import { State } from "./state";
import { Tamagotchi } from "./tamagotchi";
import { happyState } from "./happyState";
export class hungryState extends State{
    feed(tamagochi : Tamagotchi){
        tamagochi.changeState(new happyState());
        console.log('Se pone feliz')        
    }
    giveWater(){
        console.log('No pasa nati')        
    }
    cuddle(){
        console.log('No pasa nati')        
    }
}