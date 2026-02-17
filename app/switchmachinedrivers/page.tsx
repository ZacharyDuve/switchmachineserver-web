"use client"

import { useEffect, useState } from "react";

const SMDS_HOST_PATH = "/sockets/device";

export default function SwitchMachineDrivers() {
    
    const [connected, setConnected] = useState(false);
    const [switchMachines, setSwitchMachines] = useState<Array<SwitchMachine>>([]);

    useEffect(() => {
        // URL needs to be calculated in "useEffect"
        const url = `ws://${window.location.host}${SMDS_HOST_PATH}`;
        console.log("url", url)
        const ws = new WebSocket(url);
        // TODO: is there a way to have a timeout on these 

        ws.onopen = (_e: Event) => {
            setConnected(true);
            console.log(`connection to ${url} opened`)
        }

        ws.onclose = (_e: Event) => {
            setConnected(false);
            console.log(`connection to ${url} closed`)
        }

        ws.onerror = (e: Event) => {
            console.log("error occurred with switch machine websocket", e);
        }

        ws.onmessage = (e: MessageEvent) => {
            let switchMachine = JSON.parse(e.data);

            //TODO: Add some sort of message validation

            // At this point we know that this is a switch machine message lets apply the update.
            let switchMachineMessage = switchMachine as SwitchMachineMessage;
            
            switchMachineMessage.updates.forEach((messageSM, messageIndex, _) => {
                let matchingSM = switchMachines.find((curSM, curIndex, _) => {
                    return curSM.id == messageSM.id;
                })

                if (!matchingSM) {
                    // Never found a matching so it is new
                    switchMachines.push(new SwitchMachine(messageSM.id, messageSM.currentState));
                    
                } else {
                    // Updated existing
                    matchingSM.currentState = messageSM.currentState;
                    matchingSM.setState = messageSM.setState;
                }
            });
            setSwitchMachines(switchMachines)
        }

        return () => {
            ws.close();
        }
    }, []);
    
    const connectionString = connected? "Connected": "Disconnected"

    return (
        <section>
            <p>{connectionString}</p>
            {switchMachines.map((sm, _i, _) => {
                return (
                    <div>
                        <p>ID: {sm.id.toString()}</p>
                        <p>State: {sm.currentState}</p>
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

// function isSwitchMachineMessage(a: any): boolean {
//     return a &&
//         a.id && typeof(a.id) == 'number' &&
//         a.currentState && Object.values(SwitchMachineState).includes(a.currentState) &&
//         a.setState && Object.values(SwitchMachineState).includes(a.setState);
// }

//function handleWSOnMessage(e: Event, smState: {switchMachines: SwitchMachine, updateSwitchMachines: Dispatch<SetStateAction<never[]>>}) 