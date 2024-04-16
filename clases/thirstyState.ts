/* eslint-disable prettier/prettier */
import { State } from "./state";
import { Tamagotchi } from "./tamagotchi";
import { happyState } from "./happyState";
import { sadState } from "./sadState";
export class thirstyState extends State{
    public name = 'Sediento'
    feed():any{
        console.log('No pasa nada')
        return { Status: this.name }
    }

    giveWater(tamagochi: Tamagotchi): any{
        tamagochi.changeState(new happyState());
        console.log('Se pone feliz')
        return { Status: 'Feliz' }
    }

    cuddle() : any{
        console.log('No pasa nada')
        return { Status: this.name }
    }

    getStateName() : any {
        return { Status: this.name }
    }

    changeState(): State{
        return new sadState();
    }
}
