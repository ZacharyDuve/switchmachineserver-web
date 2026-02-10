"use client"

import { useEffect, useState } from "react";

const SMDS_HOST_PATH = "/sockets/device";

export default function SwitchMachineDrivers() {
    const url = `ws://${window.location.host}${SMDS_HOST_PATH}`;
    const [connected, setConnected] = useState(false);
    const [switchMachineMap, setSwitchMachineMap] = useState<Map<number, SwitchMachineState>>(new Map());
    let setD = setSwitchMachineMap;
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

            //switchMachine = SwitchMachine(switchMachine);
            
            switchMachineMap.set(switchMachine.id, switchMachine.state);
            setSwitchMachineMap(switchMachineMap);
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

interface SwitchMachineMessage {
    id: Number
    state: SwitchMachineState
}

function isSwitchMachineMessage(a: any): boolean {
    return a &&
        a.id && typeof(a.id) == 'number' &&
        a.state && Object.values(SwitchMachineState).includes(a.state);
}

//function handleWSOnMessage(e: Event, smState: {switchMachines: SwitchMachine, updateSwitchMachines: Dispatch<SetStateAction<never[]>>}) 