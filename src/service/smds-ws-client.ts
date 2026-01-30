import { json } from "stream/consumers"
import { SwitchMachineDriver, SwitchMachineDriverState } from "./switch-machine-driver-state"

export interface SMDSWebsocketClient {
    sendUpdate(smd: SwitchMachineDriver): void
}

export class SMDSWebsocketClientImpl {
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
        
        this.websocket.onopen = this.handleWSOnOpen;
        this.websocket.onclose = this.handleWSOnClose;
        this.websocket.onerror = this.handleWSOnError;
        this.websocket.onmessage = this.handleWSOnMessage;

    }

    disconnect() {
        this.websocket?.close();
        this.websocket = null;
    }

    handleWSOnOpen(_e: Event) {
        console.log("ws: connection to SMDS - opened");
    }

    handleWSOnClose(_e: Event) {
        console.log("ws: connection to SMDS - closed");
    }

    handleWSOnError(_e: Event) {
        console.log("ws: error occurred:");
    }

    handleWSOnMessage(e: Event) {
        e.
    }

}
