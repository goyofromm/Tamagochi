/* eslint-disable prettier/prettier */
import {State} from './state'

export class Tamagotchi{
    private name: string;
    public currentState: State;

    constructor(newState : State){
        this.currentState = newState
    }

    public changeState(newState : State){
        this.currentState = newState
    }

    feed() : string{
        return this.currentState.feed(this)
    }

    giveWater(){
        return this.currentState.giveWater(this)
    }

    cuddle(){
        return this.currentState.cuddle(this)
    }

}