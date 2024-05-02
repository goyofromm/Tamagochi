/* eslint-disable prettier/prettier */
import { State } from "./state";
import { hungryState } from "./hungryState";
export class happyState extends State{
    public name = 'Feliz'

    feed(): any{
        console.log('No pasa nada')    
        return { Status: this.name }
    }
    giveWater(): any{      
        console.log('Beep beep beep beep beep')        
        return { Status: this.name }
    }
    cuddle(): any{        
        console.log('No pasa nada')     
        return { Status: this.name }
    }

    getStateName(): any {
        return { Status: this.name };
    }

    changeState(): State{
        return new hungryState();
    }

    revive() : any{
        return { Status: this.name }
    }
}