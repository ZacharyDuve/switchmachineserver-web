
import React from "react";
import { ServerId } from "./components/serverid/ServerId"
import { SwitchMachineCollection } from "./components/switchmachine/SwitchMachineCollection";
import { Header } from "./components/header/Header";

export class App extends React.Component {

  render() {
    return (
      <div className="w3-dark-grey">
        <Header/>
        <ServerId/>
        <SwitchMachineCollection/>
      </div>
    );
  }
}
