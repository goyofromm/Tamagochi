/* eslint-disable prettier/prettier */
import { State } from "./state";
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
}

//Se pone feliz -- No pasa natii --- beep beep beep beep beep