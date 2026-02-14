"use client"

import { useEffect, useState } from "react";

const SMDS_HOST_PATH = "/sockets/device";

export default function SwitchMachineDrivers() {
    const url = `ws://${window.location.host}${SMDS_HOST_PATH}`;
    const [connected, setConnected] = useState(false);
    const [switchMachines, setSwitchMachines] = useState<Array<SwitchMachine>>([]);

    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onopen = (_e: Event) => {
            setConnected(true);
        }

        ws.onclose = (_e: Event) => {
            setConnected(false);
        }

        ws.onerror = (e: Event) => {
            console.log("error occurred with switch machine websocket", e);
        }

        ws.onmessage = (e: MessageEvent) => {
            let switchMachine = JSON.parse(e.data);
            if (!isSwitchMachineMessage(switchMachine)) {
                console.log("received event that is not of a switch machine");
                return;
            }

            // At this point we know that this is a switch machine message lets apply the update.
            let switchMachineMessage = switchMachine as SwitchMachineMessage
            
            
            if (switchMachines.find((sm: SwitchMachine, _: Number): boolean => {
                return switchMachineMessage.id == sm.id;
            })) {
                
            }
        }

        return () => {
            ws.close();
        }
    }, []);
    
    const connectionString = connected? "Connected": "Disconnected"

    return (
        <section>
            <p>{connectionString}</p>
            {switchMachineMap.values().map((state, id) => {
                return (
                    <div>
                        <p>ID: {id}</p>
                        <p>State: {state}</p>
                    </div>
                )
            })}
        </section>
    );
}

enum SwitchMachineState {
    Disconnected,
    Unknown,
    PositionA,
    PositionB,
    SettingToA,
    SettingToB,
}

class SwitchMachine {
    id: Number
    currentState: SwitchMachineState
    setState: SwitchMachineState

    constructor(id: Number, initialState: SwitchMachineState) {
        this.id = id;
        this.currentState = initialState;
        this.setState = initialState;
    }

    updateCurrentState(s: SwitchMachineState) {
        this.currentState = s;
    }

    updateSetState(s: SwitchMachineState) {
        this.setState = s;
    }

    getCurrentState(): SwitchMachineState {
        return this.currentState;
    }

    getSetState(): SwitchMachineState {
        return this.setState
    }

    equal(other: SwitchMachine): boolean {
        return this.id == other.id;
    }
}

class SwitchMachineList {
    switchMachines: SwitchMachine[]

    constructor() {
        this.switchMachines = [];
    }

    contains(sm: SwitchMachine): boolean {
        let foundSM = this.switchMachines.find((curSM): boolean => {
            return curSM.id == sm.id
        })

        return foundSM != undefined
    }

    handleSwitchMachineUpdate(id: Number, newState: SwitchMachineState) {
        let foundSM = this.switchMachines.find((curSM): boolean => {
            return curSM.id == id
        })

        if (foundSM) {
            // We contain so apply update
            foundSM.currentState = newState;
            foundSM.setState = newState;
        } else {
            // Did not find it is new
            foundSM = new SwitchMachine(id, newState);
            this.switchMachines.push(foundSM);
        }
    }
}

interface SwitchMachineMessage {
    // id: Number
    // currentState: SwitchMachineState
    // setState: SwitchMachineState
    updates: SwitchMachine[]
}

function isSwitchMachineMessage(a: any): boolean {
    return a &&
        a.id && typeof(a.id) == 'number' &&
        a.currentState && Object.values(SwitchMachineState).includes(a.currentState) &&
        a.setState && Object.values(SwitchMachineState).includes(a.setState);
}

//function handleWSOnMessage(e: Event, smState: {switchMachines: SwitchMachine, updateSwitchMachines: Dispatch<SetStateAction<never[]>>}) 