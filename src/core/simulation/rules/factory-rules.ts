import { TileObject } from "../../environment/tile/object/tile-object";
import { TileObjectType } from "../../environment/tile/object/tile-object-type.enum";
import { AbstractRule } from "./rule.abstract";

export default class FactoryRules extends AbstractRule {
  public evaluate(): number {
    let score = 0;

    this.forEachObjectOfType(TileObjectType.Factory, (object) => {
      score += this.evaluateObject(object);
    });

    return score;
  }

  private evaluateObject(object: TileObject): number {
    const tile = object.getTile();
    const world = this.world;
    const touching = world.getTouchingTiles(tile);

    // factories don't like touching factories
    if (AbstractRule.tilesContainObjectType(touching, TileObjectType.Factory)) {
      return 0;
    }

    const near = world.getNearTiles(tile);
    const ironMinesCount = AbstractRule.countTilesWithObjectType(near, TileObjectType.IronMine);
    const pointsPerIronMine = 2;
    // factories like having iron mines near
    return ironMinesCount * pointsPerIronMine;
  }
}
