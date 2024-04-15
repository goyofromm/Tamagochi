/* eslint-disable prettier/prettier */
import { State } from "./state";
import { Tamagotchi } from "./tamagotchi";
import { happyState } from "./happyState";
export class hungryState extends State{
    public name = 'Hungry'
    feed(tamagochi : Tamagotchi) : any {
        tamagochi.changeState(new happyState());
        console.log('Se pone feliz')        
        return { Status: 'Feliz' }
    }
    giveWater(): any{
        console.log('No pasa nada')        
        return { Status: 'Hambriento' }
    }
    cuddle():any{
        console.log('No pasa nada')        
        return { Status: 'Hambriento' }
    }

    getStateName(): any {
        return { Status: 'Hambriento' }
    }
}