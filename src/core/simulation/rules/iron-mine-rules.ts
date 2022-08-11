import { TileObject } from "../../environment/tile/object/tile-object";
import { TileObjectType } from "../../environment/tile/object/tile-object-type.enum";
import { AbstractRule } from "./rule.abstract";

export class IronMineRules extends AbstractRule {
  public static readonly pointsPerIronMine = 1;

  public evaluate(): number {
    let score = 0;

    this.forEachObjectOfType(TileObjectType.IronMine, (object) => {
      score += this.evaluateObject(object);
    });

    return score;
  }

  private evaluateObject(object: TileObject): number {
    const tile = object.getTile();
    const world = this.world;
    const touching = world.getTouchingTiles(tile);
    const ironMinesCount = AbstractRule.countTilesWithObjectType(touching, TileObjectType.IronMine);
    const pointsPerIronMine = IronMineRules.pointsPerIronMine;
    // iron mines like touching icon mines
    return ironMinesCount * pointsPerIronMine;
  }
}
