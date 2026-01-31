import { SMDSWebsocketClient } from "./smds-ws-client";
import {useState} from "react";

export enum SwitchMachineDriverState {
    Disconnected,
    PositionUnknown,
    PositionA,
    ThrowingToPositionA,
    PositionB,
    ThrowingToPositionB
}

export class SwitchMachineDriver {
    id: Number
    //currentState: SwitchMachineDriverState
    currentState: 
    driverClient: SMDSWebsocketClient

    constructor(client: SMDSWebsocketClient, id: number, initialState: SwitchMachineDriverState) {
        let x = useState(0);
        this.driverClient = client;
        this.id = id;
        this.currentState = initialState;
    } 

    updateState(newState: SwitchMachineDriverState) {
        this.currentState = newState;
        
        this.driverClient.sendUpdate(this)
    }
    
}