/* eslint-disable prettier/prettier */
import { State } from "./state";
import { Tamagotchi } from "./tamagotchi";
import { happyState } from "./happyState";

export class sadState extends State{
    public name = 'Sad'
    feed(){
     console.log('Beep, Beep - Vomita'); 
     return 'Beep, Beep - Vomita'
    }

    giveWater(){
        console.log('Beep, Beep, Beep - Tilda display');
        return 'Beep, Beep, Beep - Tilda display'
    }

    cuddle(tamagochi: Tamagotchi){
        tamagochi.changeState(new happyState());
        console.log('Se pone feliz'); 
        return 'Se pone feliz'
    }

    getStateName(): string {
        return 'Sad'
    }
}