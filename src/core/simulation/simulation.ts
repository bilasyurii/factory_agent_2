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
  private ended: boolean;
  private ready: boolean;

  constructor() {
    this.initRandom();
    this.initWorld();
    this.initDecisionConfigurator();
    this.initPlayer();
    this.ended = false;
    this.ready = true;
  }

  public isEnded(): boolean {
    return this.ended;
  }

  public reset(): void {
    this.world.reset();
    this.ended = false;
    this.ready = true;
  }

  public step(): void {
    if (!this.ready || this.ended) {
      return;
    }

    const decisionConfigurator = this.decisionConfigurator;
    decisionConfigurator.configure();

    const world = this.world;
    const action = this.player.act();
    action.setup({
      tileObjectType: decisionConfigurator.getTileObjectType(),
      decisionOptions: decisionConfigurator.getOptions(),
      world: world,
    });
    action.execute();

    if (world.getEmptyTilesCount() < decisionConfigurator.getOptionsMaxCount()) {
      this.ended = true;
    }
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
    this.player.setup({
      world: this.world,
      decisionConfigurator: this.decisionConfigurator,
    });
  }
}
