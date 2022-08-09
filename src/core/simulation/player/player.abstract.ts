import { World } from "../../environment/world/world";
import { AbstractAction } from "../action/action.abstract";
import { DecisionConfigurator } from "../decision/decision-configurator";
import { IPlayerConfig } from "./player-config.interface";

export abstract class AbstractPlayer {
  protected world: World;
  protected decisionConfigurator: DecisionConfigurator;

  public prepare(config: IPlayerConfig): void {
    this.world = config.world;
    this.decisionConfigurator = config.decisionConfigurator;
    this.onPrepared();
  }

  public abstract act(): AbstractAction;

  public abstract learn(reward: number): void;

  public abstract destroy(): void;

  protected onPrepared(): void {
    // can be overriden in derived classes
  }
}
