/* eslint-disable prettier/prettier */
import { State } from "./state";
import { Tamagotchi } from "./tamagotchi";
import { happyState } from "./happyState";
import { thirstyState } from "./thirstyState";
export class hungryState extends State{
    public name = 'Hambriento'
    feed(tamagochi : Tamagotchi) : any {
        tamagochi.changeState(new happyState());
        console.log('Se pone feliz')        
        return { Status: 'Feliz' }
    }
    giveWater(): any{
        console.log('No pasa nada')        
        return { Status: this.name }
    }
    cuddle():any{
        console.log('No pasa nada')        
        return { Status: this.name }
    }

    getStateName(): any {
        return { Status: this.name }
    }

    changeState(): State{
        return new thirstyState();
    }
}