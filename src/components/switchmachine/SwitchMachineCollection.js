import React from "react";
import { SwitchMachine } from "./SwitchMachine";


export class SwitchMachineCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchMachines: []
        }
        //this.switchMachineStates = [];
    }

    componentDidMount() {
        let component = this;
        this.socket = new WebSocket("ws://localhost:8080/api/switchmachine/event");
        this.socket.addEventListener('message', (event) => {
            console.log(event);
            let smEvent = JSON.parse(event.data);
            if (smEvent["event-name"] === "SwitchMachineAdded") {
                console.log("Adding Switch Machine")
                let smState = JSON.parse(smEvent.data);
                let hasMatch = false;
                component.state.switchMachines.forEach(curSM => {
                    if(!hasMatch) {
                        hasMatch = curSM.id() === smState.id
                    }
                })
                if(!hasMatch) {
                    let sM = new SwitchMachine(smState);
                    component.state.switchMachines.push(sM);
                    component.setState({switchMachines: component.state.switchMachines});
                }
                
            }

            
        })
    }

    componentWillUnmount() {
        this.socket.close();
    }

    render() {
        console.log("Rendering Switch Machine Collection");
        console.log(this.state);
        return (
           
            <div> States:
                {this.state.switchMachines.map(curSM => 
                    curSM.render()
                )}
            </div>
        )
    }
}