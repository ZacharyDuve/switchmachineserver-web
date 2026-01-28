import { hostname } from "node:os";


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
      <section id="switch_machines" className="bg-blue-100">
        <p className="bg-gray-300">Switch Machines: <span className="font-bold">{switchMachines.length}</span></p>
        {switchMachines.map((sm, index) => (
          <div key={index}>
            <p>Switch Machine ID: <span>{sm.id.toString()}</span></p>
          </div>
        ))}
      </section>
    </div>
  );
}
