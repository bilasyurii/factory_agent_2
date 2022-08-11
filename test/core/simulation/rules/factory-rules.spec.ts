import { expect } from "chai";
import { TileObject } from "../../../../src/core/environment/tile/object/tile-object";
import { TileObjectType } from "../../../../src/core/environment/tile/object/tile-object-type.enum";
import { World } from "../../../../src/core/environment/world/world";
import { FactoryRules } from "../../../../src/core/simulation/rules/factory-rules";
import { IRuleContext } from "../../../../src/core/simulation/rules/rule-context.interface";

describe("FactoryRules", function () {
  let world: World;
  let context: IRuleContext;
  let rule: FactoryRules;

  this.beforeEach(function () {
    world = new World({
      grid: {
        rows: 3,
        cols: 3,
      },
    });
    context = {
      world,
    };
    rule = new FactoryRules();
    rule.setContext(context);
  });

  it("should correctly handle iron mines nearby", function () {
    world.setTileObject(0, 0, new TileObject(TileObjectType.Factory));
    world.setTileObject(1, 1, new TileObject(TileObjectType.IronMine));
    world.setTileObject(0, 1, new TileObject(TileObjectType.IronMine));

    const score = rule.evaluate();

    const minesCount = 2;
    const expectedScore = minesCount * FactoryRules.pointsPerIronMine;
    expect(score).to.be.equal(expectedScore);
  });

  it("should correctly handle touching factories", function () {
    world.setTileObject(0, 0, new TileObject(TileObjectType.Factory));
    world.setTileObject(1, 0, new TileObject(TileObjectType.Factory));
    world.setTileObject(0, 1, new TileObject(TileObjectType.IronMine));

    const score = rule.evaluate();

    expect(score).to.be.equal(0);
  });
});
