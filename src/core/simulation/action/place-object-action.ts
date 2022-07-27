import { TileObject } from "../../environment/tile/object/tile-object";
import { TileObjectType } from "../../environment/tile/object/tile-object-type.enum";
import { AbstractAction } from "./action.abstract";

export class PlaceObjectAction extends AbstractAction {
  private x: number;
  private y: number;
  private type: TileObjectType;

  constructor(x: number, y: number, type: TileObjectType) {
    super();

    this.x = x;
    this.y = y;
    this.type = type;
  }

  public execute(): void {
    const object = new TileObject(this.type);
    this.context.world.setTileObject(this.x, this.y, object);
  }
}
