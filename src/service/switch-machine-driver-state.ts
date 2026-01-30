import { SMDSWebsocketClient } from "./smds-ws-client";

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
    currentState: SwitchMachineDriverState
    driverClient: SMDSWebsocketClient

    constructor(client: SMDSWebsocketClient, id: number, initialState: SwitchMachineDriverState) {
        this.driverClient = client;
        this.id = id;
        this.currentState = initialState;
    } 

    updateState(newState: SwitchMachineDriverState) {
        this.currentState = newState;
        
        this.driverClient.sendUpdate(this)
    }
    
}