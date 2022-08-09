import { expect } from "chai";
import * as sinon from "sinon";
import { TileObject } from "../../../../src/core/environment/tile/object/tile-object";
import { TileObjectType } from "../../../../src/core/environment/tile/object/tile-object-type.enum";
import { World } from "../../../../src/core/environment/world/world";
import { DecisionConfigurator } from "../../../../src/core/simulation/decision/decision-configurator";
import { Random2 } from "../../../../src/core/utils/math/random2";

describe("DecisionConfigurator", function () {
  it("should return options that are bound to the world size", function () {
    const world = new World({
      grid: {
        rows: 3,
        cols: 3,
      },
    });
    const random = new Random2(0);
    const decisionConfigurator = new DecisionConfigurator({
      world,
      random,
      maxCount: 4,
    });

    decisionConfigurator.configure();
    const options = decisionConfigurator.getOptions();

    for (const option of options) {
      expect(option).to.exist;
      expect(option.x).to.be.greaterThanOrEqual(0);
      expect(option.y).to.be.greaterThanOrEqual(0);
      expect(option.x).to.be.lessThanOrEqual(world.getCols() - 1);
      expect(option.y).to.be.lessThanOrEqual(world.getRows() - 1);
    }
  });

  it("should return options for tiles that don't contain objects", function () {
    const world = new World({
      grid: {
        rows: 2,
        cols: 2,
      },
    });
    const random = new Random2(0);
    const decisionConfigurator = new DecisionConfigurator({
      world,
      random,
      maxCount: 3,
    });
    world.setTileObject(0, 0, new TileObject(TileObjectType.Factory));

    decisionConfigurator.configure();
    const options = decisionConfigurator.getOptions();

    expect(options).to.have.length(3);

    for (const option of options) {
      expect(world.getObjectAt(option.x, option.y)).not.to.exist;
    }
  });

  it("should expand lookup bounds when the previous bounds don't contain enough tiles that are empty", function () {
    const world = new World({
      grid: {
        rows: 4,
        cols: 4,
      },
    });

    const random = new Random2(0);
    const randomStub = sinon.stub(random, "intBetween");
    randomStub.onFirstCall().returns(2);
    randomStub.onSecondCall().returns(2);

    const decisionConfigurator = new DecisionConfigurator({
      world,
      random,
      maxCount: 5,
    });
    world.setTileObject(3, 3, new TileObject(TileObjectType.Factory));
    world.setTileObject(2, 1, new TileObject(TileObjectType.Factory));

    decisionConfigurator.configure();
    const options = decisionConfigurator.getOptions();

    expect(options.findIndex((option) => option.x === 1 && option.y === 1)).not.to.be.equal(0);
    expect(options.findIndex((option) => option.x === 3 && option.y === 1)).not.to.be.equal(0);
  });

  it("should return correct options count when the world is almost full", function () {
    const world = new World({
      grid: {
        rows: 3,
        cols: 3,
      },
    });
    const random = new Random2(0);
    const decisionConfigurator = new DecisionConfigurator({
      world,
      random,
      maxCount: 4,
    });
    world.setTileObject(0, 0, new TileObject(TileObjectType.Factory));
    world.setTileObject(0, 1, new TileObject(TileObjectType.Factory));
    world.setTileObject(1, 1, new TileObject(TileObjectType.Factory));
    world.setTileObject(1, 2, new TileObject(TileObjectType.Factory));
    world.setTileObject(2, 0, new TileObject(TileObjectType.Factory));
    world.setTileObject(2, 2, new TileObject(TileObjectType.Factory));

    decisionConfigurator.configure();
    const options = decisionConfigurator.getOptions();

    expect(options).to.have.length(3);
  });
});
