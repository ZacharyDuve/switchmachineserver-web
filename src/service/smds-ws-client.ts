import { SwitchMachineDriverState } from "./switch-machine-driver"

export class SMDSWebsocketClient {
    serverURL: string
    websocket: WebSocket | null
    switchMachines: Map<Number, SwitchMachineDriverState>

    constructor(url: string) {
        this.serverURL = url;
        this.websocket = null;
        this.switchMachines = new Map();
    }

    connect() {
        this.websocket = new WebSocket(this.serverURL)
        
        this.websocket.onopen = (e) => {
            console.log("opened connection", e);
        }
    }
}