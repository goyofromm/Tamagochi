/* eslint-disable prettier/prettier */
import { State } from "./state";

export class deadState extends State{
    public name = 'Muerto'
    feed() : any {
        console.log('No pasa nada')        
        return { Status: this.name }
    }
    giveWater(): any{
        console.log('No pasa nada')        
        return { Status: this.name }
    }
    cuddle():any{
        console.log('No pasa nada')        
        return { Status: this.name }
    }
    revive():any{
        console.log('REVIVIO!')        
        return { Status: 'Feliz' }
    }
    getStateName(): any {
        return { Status: this.name }
    }

    changeState() : any{
      return this
    }
}