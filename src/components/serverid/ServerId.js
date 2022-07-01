
import React from "react";

export class ServerId extends React.Component {
    constructor(props) {
        super(props);
            
        this.state = {serverId: "unknown"};
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/serverid",{mode: 'cors', headers: {'Access-Control-Allow-Origin':'*'}})
        .then(r => r.json())
        .then(r => {
            this.setState({serverId: r["server-id"]});
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        console.log(this);
        console.log(this.state);
        return (<p>Server ID : {this.state.serverId}</p>)
    }
}