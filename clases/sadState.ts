/* eslint-disable prettier/prettier */
import { State } from "./state";
import { Tamagotchi } from "./tamagotchi";
import { happyState } from "./happyState";

export class sadState extends State{
    feed(){
     console.log('Beep, Beep - Vomita'); 
    }

    giveWater(){
        console.log('Beep, Beep, Beep - Tilda display');
    }

    cuddle(tamagochi: Tamagotchi){
        tamagochi.changeState(new happyState());
        console.log('Se pone feliz!'); 
    }
}