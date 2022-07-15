import React from "react";

const gpioOffStyle = "w3-button w3-border w3-round w3-ripple w3-padding-small w3-red";
const gpioOnStyle = "w3-button w3-border w3-round w3-ripple w3-padding-small w3-green";

const toPositionStyle = "w3-button w3-border w3-round w3-ripple w3-padding-small w3-blue";
const toPositionDisabledStyle = " w3-border w3-round w3-padding-small w3-blue w3-disabled";

const motorIdleStyle = "w3-cell w3-padding-small w3-cell-middle w3-center";
const motorActiveStyle = "w3-cell w3-padding-small w3-cell-middle w3-center w3-lime"

export class SwitchMachine extends React.Component {
    constructor(props) {
        super(props);
        this.toggleGPIO0 = this.toggleGPIO0.bind(this);
        this.toggleGPIO1 = this.toggleGPIO1.bind(this);
        this.sendToPosition0 = this.sendToPosition0.bind(this);
        this.sendToPosition1 = this.sendToPosition1.bind(this);

        this.state = {};
    }
    render() {
        console.log("SM this", this);
        return (
            <div className="w3-container w3-border w3-round w3-light-gray">
                <div className=" w3-cell w3-padding-small w3-cell-middle" style={{width: 70}}>
                    Id: {this.props.state.id}
                </div>
                <div className="w3-cell w3-padding-small w3-gray">
                    <div className="w3-center">
                        Position: {this.props.state.position}
                    </div>
                    <div className="w3-center">
                        <button className={this.props.state.position !== "position 0" ? toPositionStyle : toPositionDisabledStyle} onClick={this.sendToPosition0}>
                            Move to 0
                        </button>
                        <button className={this.props.state.position !== "position 1" ? toPositionStyle : toPositionDisabledStyle} onClick={this.sendToPosition1}> 
                            Move to 1
                        </button>
                    </div>
                </div>
                <div className={this.props.state.motorState === "idle" ? motorIdleStyle : motorActiveStyle} style={{width: 200}}>
                    Motor: {this.props.state.motorState}
                </div>
                <div className="w3-cell w3-padding-small w3-gray">
                    <div className="w3-center">
                        GPIOS
                    </div>
                    <div className="w3-center">
                        <button className={this.props.state.gpio0 === "off" ? gpioOffStyle : gpioOnStyle} onClick={this.toggleGPIO0}>
                            0 : {this.props.state.gpio0}
                        </button>
                        <button className={this.props.state.gpio1 === "off" ? gpioOffStyle : gpioOnStyle} onClick={this.toggleGPIO1}> 
                            1 : {this.props.state.gpio1}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    toggleGPIO0() {
        let newState = newSwitchMachineStateFromAnother(this.props.state);
        if(newState.gpio0 === "off" ) {
            newState.gpio0 = "on";
        } else {
            newState.gpio0 = "off";
        }
        let body = [newState];
        console.log("toggleGPIO0 payload state", newState);
        fetch("/api/switchmachine", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).catch(err => {
            console.log(err);
        })
    }

    toggleGPIO1() {
        let newState = newSwitchMachineStateFromAnother(this.props.state);
        if(newState.gpio1 === "off" ) {
            newState.gpio1 = "on";
        } else {
            newState.gpio1 = "off";
        }
        let body = [newState];
        console.log("toggleGPIO1 payload state", newState);
        fetch("/api/switchmachine", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).catch(err => {
            console.log(err);
        })
    }

    sendToPosition0() {
        let newState = newSwitchMachineStateFromAnother(this.props.state);
        newState.position = "position 0";
        let body = [newState];

        fetch("/api/switchmachine", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).catch(err => {
            console.log(err);
        })
    }
    
    sendToPosition1() {
        let newState = newSwitchMachineStateFromAnother(this.props.state);
        newState.position = "position 1";
        let body = [newState];

        fetch("/api/switchmachine", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).catch(err => {
            console.log(err);
        })
    }
}

function newSwitchMachineStateFromAnother(origState) {
    let newState = {...origState};
    newState.updateTimeMillis = new Date().getTime();
    return newState;
}