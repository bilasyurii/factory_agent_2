import { GameConfig } from "../config/game-config";
import { Simulation } from "../core/simulation/simulation";
import { SimulationRunner } from "../core/simulation/runner/simulation-runner";

export class GameScene extends Phaser.Scene {
  private simulation: Simulation;
  private simulationRunner: SimulationRunner;

  constructor() {
    super({
      key: 'game',
    });
  }

  public create(): void {
    this.initSimulation();
    this.initSimulationRunner();
    this.listenEvents();
    this.initTimer();
    this.play();
  }

  private initTimer(): void {
    this.time.addEvent({
      delay: GameConfig.StepInterval,
      loop: true,
      callback: this.step,
      callbackScope: this,
    });
  }

  private step(): void {
    this.simulationRunner.update();
  }

  private play(): void {
    this.simulationRunner.play();
  }

  private reset(): void {
    this.simulation.reset();
  }

  private initSimulation(): void {
    this.simulation = new Simulation();
  }

  private initSimulationRunner(): void {
    this.simulationRunner = new SimulationRunner({
      simulation: this.simulation,
      eventImplementation: Phaser.Events.EventEmitter,
    });
  }

  private listenEvents(): void {
    this.simulationRunner.events.addListener(SimulationRunner.Events.Ended, this.onSimulationEnded, this);
  }

  private onSimulationEnded(): void {
    this.reset();
    this.play();
  }
}
