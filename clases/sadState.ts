/* eslint-disable prettier/prettier */
import { State } from "./state";
import { Tamagotchi } from "./tamagotchi";
import { happyState } from "./happyState";

export class sadState extends State{
    public name = 'Sad'
    feed():any{
     console.log('Beep, Beep - Vomita'); 
     return { Status: "Triste" }
    }

    giveWater() : any{
        console.log('Beep, Beep, Beep - Tilda display');
        return { Status: "Triste" }
    }

    cuddle(tamagochi: Tamagotchi): any{ 
        tamagochi.changeState(new happyState());
        console.log('Se pone feliz'); 
        return { Status: 'Feliz' }
    }

    getStateName(): any {
        return { Status: "Triste" }
    }
}