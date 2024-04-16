/* eslint-disable prettier/prettier */
import { State } from "./state";
import { Tamagotchi } from "./tamagotchi";
import { happyState } from "./happyState";
import { deadState } from "./deadState";

export class sadState extends State{
    public name = 'Triste'
    feed():any{
     console.log('Beep, Beep - Vomita'); 
     return { Status: this.name }
    }

    giveWater() : any{
        console.log('Beep, Beep, Beep - Tilda display');
        return { Status: this.name }
    }

    cuddle(tamagochi: Tamagotchi): any{ 
        tamagochi.changeState(new happyState());
        console.log('Se pone feliz'); 
        return { Status: 'Feliz' }
    }

    getStateName(): any {
        return { Status: this.name }
    }

    changeState(): State{
        return new deadState();
    }
}