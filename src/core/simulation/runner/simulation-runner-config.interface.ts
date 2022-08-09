import { ISimulationEvent } from "../../utils/events/simulation-event.interface";
import { Simulation } from "../simulation";

export interface ISimulationRunnerConfig {
  simulation: Simulation;
  eventImplementation: new () => ISimulationEvent;
}
