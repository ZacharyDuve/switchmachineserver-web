
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

    constructor(id: number, initialState: SwitchMachineDriverState) {
        this.id = id;
        this.currentState = initialState;
    } 

    
}