import { hostname } from "node:os";
import SwitchMachineDrivers from "./switchmachinedrivers/page";


class SwitchMachine {
  id: Number
  constructor(i: Number) {
    this.id = i;
  }
}

export default function Home() {
  let switchMachines: SwitchMachine[] = [];
  switchMachines.push(new SwitchMachine(0));
  return (
    <div className="flex flex-col">
      <p className="bg-blue-500 text-white text-xl">Switch Machine Driver Server</p>
      <div className="bg-blue-300">
        <p>Server IP: <span className="font-bold">{hostname()}</span></p>
        <p>Server ID: <span className="font-bold">UNKNOWN</span></p>
      </div>
      <SwitchMachineDrivers/>
    </div>
  );
}
