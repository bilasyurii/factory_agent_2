import { AbstractPlayer } from "./player.abstract";
import { AbstractAction } from "../action/action.abstract";
import { DecideAction } from "../action/decide-action";

export class RandomPlayer extends AbstractPlayer {
  public act(): AbstractAction {
    const actionsCount = this.getActionsCount();
    return new DecideAction(this.random2.int() % actionsCount);
  }

  public learn(_reward: number): void {
    // do nothing
  }

  public destroy(): void {
    // do nothing
  }

  protected onSetup(): void {
    // do nothing
  }
}
