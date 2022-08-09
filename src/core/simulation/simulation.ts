import { GameConfig } from "../../config/game-config";
import { World } from "../environment/world/world";
import { Random2 } from "../utils/math/random2";
import { DecisionConfigurator } from "./decision/decision-configurator";
import { AIPlayer } from "./player/ai-player";
import { AbstractPlayer } from "./player/player.abstract";

export class Simulation {
  private random: Random2;
  private world: World;
  private decisionConfigurator: DecisionConfigurator;
  private player: AbstractPlayer;

  constructor() {
    this.initRandom();
    this.initWorld();
    this.initDecisionConfigurator();
    this.initPlayer();
  }

  public prepare(): void {
    this.player.prepare({
      world: this.world,
      decisionConfigurator: this.decisionConfigurator,
    });
  }

  public step(): void {
    this.decisionConfigurator.configure();
    this.player.act();
  }

  private initRandom(): void {
    this.random = new Random2();
  }

  private initWorld(): void {
    this.world = new World({
      grid: {
        rows: GameConfig.World.Rows,
        cols: GameConfig.World.Cols,
      },
    });
  }

  private initDecisionConfigurator(): void {
    this.decisionConfigurator = new DecisionConfigurator({
      world: this.world,
      random: this.random,
      maxCount: GameConfig.Decision.MaxCount,
    });
  }

  private initPlayer(): void {
    this.player = new AIPlayer();
  }
}
