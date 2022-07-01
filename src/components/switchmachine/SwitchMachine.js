import React from "react";

export class SwitchMachine extends React.Component {
    constructor(props) {
        super(props);
        console.log("SwitchMachine props", props);
        const {id, position, motor, gpio0, gpio1} = props;
        this.state = {id, position, motorState: motor, gpio0, gpio1}; 
    }

    id() {
        return this.state.id;
    }

    render() {
        return (
            <div key={this.state.id}>
                Id: {this.state.id}, Position: {this.state.position}, Motor: {this.state.motorState}, GPIO0: {this.state.gpio0}, GPIO1: {this.state.gpio1}
            </div>
        )
    }
}