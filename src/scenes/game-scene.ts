import { GameConfig } from "../config/game-config";
import { Simulation } from "../core/simulation/simulation";
import { SimulationRunner } from "../core/simulation/runner/simulation-runner";
import { SimulationView } from "../view/simulation/simulation-view";
import { UI } from "../view/ui/ui";

export class GameScene extends Phaser.Scene {
  private simulation: Simulation;
  private simulationRunner: SimulationRunner;
  private simulationView: SimulationView;
  private ui: UI;

  constructor() {
    super({
      key: "game",
    });
  }

  public create(): void {
    this.initSimulation();
    this.initSimulationRunner();
    this.initSimulationView();
    this.initUI();
    this.listenEvents();
    this.initTimer();
    this.reset();
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
    this.simulationView.reset();
  }

  private initSimulation(): void {
    this.simulation = new Simulation({
      playerClass: GameConfig.Simulation.playerClass,
    });
  }

  private initSimulationRunner(): void {
    this.simulationRunner = new SimulationRunner({
      simulation: this.simulation,
      eventImplementation: Phaser.Events.EventEmitter,
    });
  }

  private initSimulationView(): void {
    const simulationView = new SimulationView({
      scene: this,
      world: this.simulation.getWorld(),
    });
    this.simulationView = simulationView;
    this.add.existing(simulationView);
    simulationView.setScale(GameConfig.View.Scale);
  }

  private initUI(): void {
    const ui = new UI(this);
    this.ui = ui;
    this.add.existing(ui);
  }

  private listenEvents(): void {
    const simulationRunnerEvents = this.simulationRunner.events;
    simulationRunnerEvents.addListener(SimulationRunner.Events.Ended, this.onSimulationEnded, this);
    simulationRunnerEvents.addListener(SimulationRunner.Events.Updated, this.onSimulationUpdated, this);
  }

  private onSimulationEnded(): void {
    this.ui.onSimulationEnded(this.simulation.getScore());
    this.reset();
    this.play();
  }

  private onSimulationUpdated(): void {
    this.simulationView.updateView();
    this.ui.setScore(this.simulation.getScore());
  }
}
