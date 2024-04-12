/* eslint-disable prettier/prettier */
import { State } from "./state";
export class happyState extends State{
    feed(): string{
        console.log('No pasa nada')    
        return 'No pasa nada'    
    }
    giveWater(): string{      
        console.log('Beep beep beep beep beep')        
        return 'Beep beep beep beep beep'
    }
    cuddle(): string{        
        console.log('No pasa nada')     
        return 'No pasa nada'   
    }

    getStateName(): string {
        return 'Happy'
    }
}

//Se pone feliz -- No pasa natii --- beep beep beep beep beep