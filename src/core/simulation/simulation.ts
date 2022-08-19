import { GameConfig } from "../../config/game-config";
import { World } from "../environment/world/world";
import { Math2 } from "../utils/math/math2";
import { Random2 } from "../utils/math/random2";
import { DecisionConfigurator } from "./decision/decision-configurator";
import { AIPlayer } from "./player/ai-player";
import { AbstractPlayer } from "./player/player.abstract";
// import { RandomPlayer } from "./player/random-player";
import { RulesManager } from "./rules/rules-manager";

export class Simulation {
  private random: Random2;
  private world: World;
  private decisionConfigurator: DecisionConfigurator;
  private rules: RulesManager;
  private player: AbstractPlayer;
  private ended: boolean;
  private ready: boolean;
  private score: number;

  constructor() {
    this.initRandom();
    this.initWorld();
    this.initDecisionConfigurator();
    this.initRules();
    this.initPlayer();
    this.resetData();
  }

  public getWorld(): World {
    return this.world;
  }

  public getScore(): number {
    return this.score;
  }

  public isEnded(): boolean {
    return this.ended;
  }

  public reset(): void {
    this.world.reset();
    this.decisionConfigurator.reset();
    this.resetData();
  }

  public step(): void {
    if (!this.ready || this.ended) {
      return;
    }

    const decisionConfigurator = this.decisionConfigurator;
    decisionConfigurator.configure();

    const player = this.player;
    const action = player.act();
    action.setup({
      tileObjectType: decisionConfigurator.getTileObjectType(),
      decisionOptions: decisionConfigurator.getOptions(),
      world: this.world,
    });
    action.execute();

    const score = this.rules.evaluate();
    const scoreDiff = score - this.score;
    const reward = Math2.normalizeLogarithmicSigned(scoreDiff, 2, 2);
    this.score = score;
    player.learn(reward);

    if (this.checkIfEnded()) {
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
      decisionRoundsCount: this.getDecisionRoundsCount(),
    });
  }

  private initRules(): void {
    this.rules = new RulesManager({
      world: this.world,
    });
    this.rules.setupDefaultRules();
  }

  private initPlayer(): void {
    const player = new AIPlayer();
    this.player = player;
    this.setupPlayer(player);
  }

  private checkIfEnded(): boolean {
    const world = this.world;
    const tilesCount = world.getTilesCount();
    const emptyCount = world.getEmptyTilesCount();
    const filledCount = tilesCount - emptyCount;
    const targetCount = this.getDecisionRoundsCount();
    return filledCount >= targetCount;
  }

  private getDecisionRoundsCount(): number {
    return ~~(this.world.getTilesCount() / 3) - 1;
  }

  private resetData(): void {
    this.score = 0;
    this.ended = false;
    this.ready = true;
  }

  private setupPlayer(player: AbstractPlayer): void {
    player.setup({
      world: this.world,
      decisionConfigurator: this.decisionConfigurator,
      random: this.random,
    });
  }
}
