/* eslint-disable prettier/prettier */
import { State } from "./state";
import { Tamagotchi } from "./tamagotchi";
import { happyState } from "./happyState";
export class hungryState extends State{
    feed(tamagochi : Tamagotchi) : string {
        tamagochi.changeState(new happyState());
        console.log('Se pone feliz')        
        return  'Se pone feliz'
    }
    giveWater(){
        console.log('No pasa nada')        
        return  'No pasa nada'
    }
    cuddle(){
        console.log('No pasa nada')        
        return  'No pasa nada'
    }
}