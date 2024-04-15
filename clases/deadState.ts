/* eslint-disable prettier/prettier */
import { State } from "./state";
import { Tamagotchi } from "./tamagotchi";
import { happyState } from "./happyState";
import { thirstyState } from "./thirstyState";
export class deadState extends State{
    public name = 'Dead'
    feed() : any {
        console.log('No pasa nada')        
        return { Status: 'Muerto' }
    }
    giveWater(): any{
        console.log('No pasa nada')        
        return { Status: 'Muerto' }
    }
    cuddle():any{
        console.log('No pasa nada')        
        return { Status: 'Muerto' }
    }

    getStateName(): any {
        return { Status: 'Muerto' }
    }

    changeState() : any{
        return "Esta muerto";
    }
}