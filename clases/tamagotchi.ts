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

    feed(){
        this.currentState.feed(this)
    }

    giveWater(){
        this.currentState.giveWater(this)
    }

    cuddle(){
        this.currentState.cuddle(this)
    }

}