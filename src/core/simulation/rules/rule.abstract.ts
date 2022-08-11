import { TileObject } from "../../environment/tile/object/tile-object";
import { TileObjectType } from "../../environment/tile/object/tile-object-type.enum";
import { Tile } from "../../environment/tile/tile";
import { World } from "../../environment/world/world";
import { IRuleContext } from "./rule-context.interface";

export type TileObjectHandler = (type: TileObject) => void;

export abstract class AbstractRule {
  protected world: World;

  public setContext(context: IRuleContext): void {
    this.world = context.world;
  }

  public abstract evaluate(): number;

  protected forEachObjectOfType(type: TileObjectType, cb: TileObjectHandler): void {
    this.world.getObjectsOfType(type).forEach(cb, this);
  }

  protected static tilesContainObjectType(tiles: Tile[], type: TileObjectType): boolean {
    const length = tiles.length;

    for (let i = 0; i < length; ++i) {
      const tile = tiles[i];
      const object = tile.getObject();

      if (object && object.getType() === type) {
        return true;
      }
    }

    return false;
  }

  protected static countTilesWithObjectType(tiles: Tile[], type: TileObjectType): number {
    const length = tiles.length;
    let count = 0;

    for (let i = 0; i < length; ++i) {
      const tile = tiles[i];
      const object = tile.getObject();

      if (object && object.getType() === type) {
        ++count;
      }
    }

    return count;
  }
}
