import { TileObject } from "./object/tile-object";

export class Tile {
  private x: number;
  private y: number;
  private object: TileObject;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public getObject(): TileObject {
    return this.object;
  }

  public setObject(object: TileObject): void {
    const prevObject = this.object;

    if (prevObject !== object) {
      if (prevObject) {
        this.object = null;
        prevObject.setTile(null);
      }

      this.object = object;

      if (object) {
        object.setTile(this);
      }
    }
  }
}
