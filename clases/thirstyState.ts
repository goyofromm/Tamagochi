/* eslint-disable prettier/prettier */
import { State } from "./state";
import { Tamagotchi } from "./tamagotchi";
import { happyState } from "./happyState";
export class thirstyState extends State{
    public name = 'Thirsty'
    feed():any{
        console.log('No pasa nada')
        return { Status: 'Sediento' }
    }

    giveWater(tamagochi: Tamagotchi): any{
        tamagochi.changeState(new happyState());
        console.log('Se pone feliz')
        return { Status: 'Feliz' }
    }

    cuddle() : any{
        console.log('No pasa nada')
        return { Status: 'Sediento' }
    }

    getStateName() : any {
        return { Status: 'Sediento' }
    }
}
