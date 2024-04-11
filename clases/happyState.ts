/* eslint-disable prettier/prettier */
import { State } from "./state";
export class happyState extends State{
    feed(): string{
        console.log('No pasa nati')    
        return 'No pasa nati'    
    }
    giveWater(): string{      
        console.log('Beep beep beep beep beep')        
        return 'Beep beep beep beep beep'
    }
    cuddle(): string{        
        console.log('No pasa nati')     
        return 'No pasa nati'   
    }
}

//Se pone feliz -- No pasa natii --- beep beep beep beep beep