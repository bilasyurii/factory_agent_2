import { GameConfig } from "../../../config/game-config";
import { ISimulationEvent } from "../../utils/events/simulation-event.interface";
import { Random2 } from "../../utils/math/random2";
import { Simulation } from "../simulation";
import { ISimulationRunnerConfig } from "./simulation-runner-config.interface";

enum Events {
  Updated = "Updated",
  Ended = "Ended",
}

export class SimulationRunner {
  public static readonly Events = Events;
  public readonly events: ISimulationEvent;

  private simulation: Simulation;
  private running: boolean = false;
  private iteration: number = 0;

  constructor(config: ISimulationRunnerConfig) {
    this.events = new config.eventImplementation();
    this.simulation = config.simulation;

    this.setupRandomSeed();
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

    const steps = GameConfig.Runner.StepsPerTick;
    const simulation = this.simulation;

    for (let i = 0; i < steps; ++i) {
      if (!this.running) {
        break;
      }

      if (simulation.isEnded()) {
        this.onEnded();
        break;
      }
  
      simulation.step();
    }

    this.events.emit(Events.Updated);
  }

  private onEnded(): void {
    this.running = false;

    ++this.iteration;

    if (this.iteration % GameConfig.Runner.ChangeSeedEveryNthIteration === 0) {
      this.setupRandomSeed();
    }

    this.events.emit(Events.Ended);
  }

  private setupRandomSeed(): void {
    this.simulation.setRandomSeed(Random2.makeSeed());
  }
}
