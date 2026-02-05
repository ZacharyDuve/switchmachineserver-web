
import { useEffect, useState } from "react";

const SMDS_HOST_PATH = "/sockets/device";

export default function SwitchMachineDrivers() {
    const url = `ws://${window.location.host}${SMDS_HOST_PATH}`;
    const [devices, setDevices] = useState([]);
    useEffect(() => {

    }, []);
    
    
    return (
        <section>
            <data value="sdads"></data>
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
    state: SwitchMachineSate

    constructor(id: Number, state: SwitchMachineState) {
        this.id = id;
        this.state = state;
    }
}
