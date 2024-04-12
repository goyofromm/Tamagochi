/* eslint-disable prettier/prettier */
import { State } from "./state";
import { Tamagotchi } from "./tamagotchi";
import { happyState } from "./happyState";
export class thirstyState extends State{
    feed(){
        console.log('No pasa nada')
        return 'No pasa nada'
    }

    giveWater(tamagochi: Tamagotchi){
        tamagochi.changeState(new happyState());
        console.log('Se pone feliz')
        return 'Se pone feliz'
    }

    cuddle(){
        console.log('No pasa nada')
        return 'No pasa nada'
    }
}
