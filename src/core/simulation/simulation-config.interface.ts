import { AbstractPlayer } from "./player/player.abstract";

export interface ISimulationConfig {
  playerClass: new () => AbstractPlayer,
}
