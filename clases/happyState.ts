/* eslint-disable prettier/prettier */
import { State } from "./state";
import { hungryState } from "./hungryState";
export class happyState extends State{
    feed(): any{
        console.log('No pasa nada')    
        return { Status: 'Feliz' }
    }
    giveWater(): any{      
        console.log('Beep beep beep beep beep')        
        return { Status: 'Feliz' }
    }
    cuddle(): any{        
        console.log('No pasa nada')     
        return { Status: 'Feliz' }
    }

    getStateName(): any {
        return { Status: 'Feliz' };
    }

    changeState(): State{
        return new hungryState();
    }
}

//Se pone feliz -- No pasa natii --- beep beep beep beep beep