import { ISimulationEvent } from "../../utils/events/simulation-event.interface";
import { Simulation } from "../simulation";
import { ISimulationRunnerConfig } from "./simulation-runner-config.interface";

enum Events {
  Ended = 'Ended',
}

export class SimulationRunner {
  public static readonly Events = Events;
  public readonly events: ISimulationEvent;

  private simulation: Simulation;
  private running: boolean = false;

  constructor(config: ISimulationRunnerConfig) {
    this.events = new config.eventImplementation();
    this.simulation = config.simulation;
  }

  public play(): void {
    this.running = true;
  }

  public stop(): void {
    this.running = false;
  }

  public update(): void {
    if (!this.running) {
      return;
    }

    if (this.simulation.isEnded()) {
      this.onEnded();
      return;
    }

    this.simulation.step();
  }

  private onEnded(): void {
    this.running = false;
    this.events.emit(Events.Ended);
  }
}
