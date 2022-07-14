
import React from "react";

const idUnknown = "unknown";
const idErrored = "Error retrieving Id"

export class ServerId extends React.Component {
    constructor(props) {
        super(props);
            
        this.state = {serverId: idUnknown};
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/serverid",{mode: 'cors', headers: {'Access-Control-Allow-Origin':'*'}})
        .then(r => r.json())
        .then(r => {
            this.setState({serverId: r["server-id"]});
        }).catch((err) => {
            this.setState({serverId: idErrored});
            console.log(err);
        });
    }

    render() {
        return (
            <div className="w3-container w3-indigo">
                <h4>Server ID : {this.state.serverId}</h4>
            </div>
        )
    }
}