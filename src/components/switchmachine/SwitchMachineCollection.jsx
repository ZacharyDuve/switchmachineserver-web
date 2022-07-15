import React from "react";
import { SwitchMachine } from "./SwitchMachine";

const smAddEventName = "SwitchMachineAdded";
const smRemoveEventName = "SwitchMachineRemoved";
const smUpdatedEventName = "SwitchMachineUpdated";

export class SwitchMachineCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchMachineStates: []
        }
    }

    componentDidMount() {
        const thisComponent = this;
        if(!this.socket) {
            this.socket = new WebSocket("ws://" + window.location.host + "/api/switchmachine/event");
            this.socket.addEventListener('message', (event) => {
                console.log("event received", event)
                let smEvent = JSON.parse(event.data);
                console.log("Got Event", smEvent);
                let smState = smEvent.switchMachineState
                let contains = containsSwitchMachine(smState, thisComponent.state.switchMachineStates);
                if(smEvent.eventType === smAddEventName) {
                    //We need to add a switch machine
                    console.log("Got a switchmachine added event");
                    if(!contains) {
                        console.log("Didn't contain adding");
                        addSwitchMachineStateToList(smState, thisComponent.state.switchMachineStates);
                        thisComponent.setState({switchMachineStates: thisComponent.state.switchMachineStates.slice()});
                    }
                    
                } else if(smEvent.eventType === smRemoveEventName) {
                    if(contains) {
                        removeSwitchMachineStateFromList(smState, thisComponent.state.switchMachineStates);
                        thisComponent.setState({switchMachineStates: thisComponent.state.switchMachineStates.slice()});
                    }
                } else if(smEvent.eventType === smUpdatedEventName) {
                    if(contains) {
                        updateSwitchMachineStateIfNewer(smState, thisComponent.state.switchMachineStates);
                        thisComponent.setState({switchMachineStates: thisComponent.state.switchMachineStates.slice()});
                    }
                }
            });
        }
        fetch("/api/switchmachine").then(response => {
            return response.json();
        }).then(smStates => {
            //console.log(smStates);
            for(let i = 0; i < smStates.length; i++) {
                addSwitchMachineStateToList(smStates[i], this.state.switchMachineStates);
            }
            this.setState({switchMachineStates: this.state.switchMachineStates.slice()})
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
        console.log("Rendering Switch Machine Collection");
        console.log(this.state);
        return (
           
            <div className="w3-container w3-blue"> 
                <h4>Switch Machines</h4>
                {this.state.switchMachineStates.map(curState => <SwitchMachine key={curState.id} state={curState}/> )}
            </div>
        )
    }
}



function containsSwitchMachine(state, switchMachineStates) {
    let contains = false;

    for(let i = 0; i < switchMachineStates.length; i++) {
        if(switchMachineStates[i].id === state.id) {
            contains = true;
            break;
        }
    }

    return contains;
}

function addSwitchMachineStateToList(state, switchMachineStates) {
    if(switchMachineStates.length === 0 ) {
        switchMachineStates.push(state);
    } else {
        let wasAdded = false;
        for(let i = 0; i < switchMachineStates.length; i++) {
            if(switchMachineStates[i].id === state.id) {
                return;
            }
            if(switchMachineStates[i].id > state.id) {
                switchMachineStates.splice(i, 0, state);
                wasAdded = true;
                break;
            }
        }
        if(!wasAdded) {
            switchMachineStates.push(state);
        }
    }
}

function removeSwitchMachineStateFromList(state, switchMachineStates) {
    for(let i = 0; i < switchMachineStates.length; i++) {
        if(switchMachineStates[i].id === state.id) {
            switchMachineStates.splice(i, 1);
            break;
        }
    }
}

function updateSwitchMachineStateIfNewer(state, switchMachineStates) {
    for(let i = 0; i < switchMachineStates.length; i++) {
        if(switchMachineStates[i].id === state.id && switchMachineStates[i].updateTimeMillis < state.updateTimeMillis) {
            console.log("updating as new state is newer");
            switchMachineStates[i] = state;
            break;
        }
    }
}