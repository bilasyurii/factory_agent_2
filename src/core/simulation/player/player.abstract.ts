import { World } from "../../environment/world/world";
import { Random2 } from "../../utils/math/random2";
import { AbstractAction } from "../action/action.abstract";
import { DecisionConfigurator } from "../decision/decision-configurator";
import { IPlayerConfig } from "./player-config.interface";

export abstract class AbstractPlayer {
  protected world: World;
  protected decisionConfigurator: DecisionConfigurator;
  protected random2: Random2;

  public setup(config: IPlayerConfig): void {
    this.world = config.world;
    this.decisionConfigurator = config.decisionConfigurator;
    this.random2 = config.random;

    this.onSetup();
  }

  public abstract act(): AbstractAction;

  public abstract learn(reward: number): void;

  public abstract destroy(): void;

  protected onSetup(): void {
    // can be overridden in derived classes
  }

  protected getActionsCount(): number {
    return this.decisionConfigurator.getOptionsMaxCount();
  }
}
