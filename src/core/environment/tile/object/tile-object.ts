import { Tile } from "../tile";
import { TileObjectType } from "./tile-object-type.enum";

export class TileObject {
  private type: TileObjectType;
  private tile: Tile;

  constructor(type: TileObjectType) {
    this.type = type;
  }

  public getType(): TileObjectType {
    return this.type;
  }

  public getTile(): Tile {
    return this.tile;
  }

  public setTile(tile: Tile): void {
    const prevTile = this.tile;

    if (prevTile !== tile) {
      if (prevTile) {
        this.tile = null;
        prevTile.setObject(null);
      }
  
      this.tile = tile;
  
      if (tile) {
        tile.setObject(this);
      }
    }
  }
}
