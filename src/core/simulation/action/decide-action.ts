import { TileObject } from "../../environment/tile/object/tile-object";
import { AbstractAction } from "./action.abstract";

export class DecideAction extends AbstractAction {
  private optionIndex: number;

  constructor(optionIndex: number) {
    super();

    this.optionIndex = optionIndex;
  }

  public execute(): void {
    const context = this.context;
    const object = new TileObject(context.tileObjectType);
    const option = context.decisionOptions[this.optionIndex];
    context.world.setTileObject(option.x, option.y, object);
  }
}
