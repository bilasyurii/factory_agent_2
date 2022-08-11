import { expect } from "chai";
import { TileObject } from "../../../../src/core/environment/tile/object/tile-object";
import { TileObjectType } from "../../../../src/core/environment/tile/object/tile-object-type.enum";
import { World } from "../../../../src/core/environment/world/world";
import { Bounds } from "../../../../src/core/utils/math/bounds";

describe("World", function () {
  it("should be able to provide tiles count", function () {
    const world = new World({
      grid: {
        rows: 3,
        cols: 4,
      },
    });

    const tilesCount = world.getTilesCount();

    expect(tilesCount).to.be.equal(12);
  });

  it("should not throw exception when trying to add object to non-existing tile", function () {
    const world = new World({
      grid: {
        rows: 3,
        cols: 3,
      },
    });
    const x = 4;
    const y = -1;
    const object = new TileObject(TileObjectType.Factory);

    const act = () => world.setTileObject(x, y, object);

    expect(act).not.to.throw();
  });

  it("should return correct tiles count in specified bounds", function () {
    const world = new World({
      grid: {
        rows: 3,
        cols: 4,
      },
    });
    const bounds = new Bounds();
    bounds.setFromMinMax(-10, 2, -1, 1);

    const tiles = world.getTilesInBounds(bounds);

    expect(tiles).to.have.length(6);
  });

  it("should return correct amount of empty tiles", function () {
    const world = new World({
      grid: {
        rows: 3,
        cols: 3,
      },
    });
    world.setTileObject(1, 1, new TileObject(TileObjectType.Factory));
    world.setTileObject(0, 0, new TileObject(TileObjectType.Factory));

    const emptyTilesCount = world.getEmptyTilesCount();

    expect(emptyTilesCount).to.be.equal(7);
  });

  it("should produce correct object types grid", function () {
    const world = new World({
      grid: {
        rows: 2,
        cols: 2,
      },
    });
    world.setTileObject(1, 1, new TileObject(TileObjectType.Factory));
    world.setTileObject(0, 0, new TileObject(TileObjectType.IronMine));

    const objectTypes = world.getObjectTypesGrid();

    expect(objectTypes).to.be.deep.equal([
      [TileObjectType.IronMine, null],
      [null, TileObjectType.Factory],
    ]);
  });

  it("should return all objects of specified type", function () {
    const world = new World({
      grid: {
        rows: 2,
        cols: 2,
      },
    });
    const ironMine1 = new TileObject(TileObjectType.IronMine);
    const factory1 = new TileObject(TileObjectType.Factory);
    const factory2 = new TileObject(TileObjectType.Factory);
    world.setTileObject(0, 0, ironMine1);
    world.setTileObject(1, 0, factory1);
    world.setTileObject(1, 1, factory2);

    const objects = world.getObjectsOfType(TileObjectType.Factory);

    expect(objects).to.have.length(2);
    expect(objects).to.contain(factory1);
    expect(objects).to.contain(factory2);
  });

  it("should correctly return touching tiles", function () {
    const world = new World({
      grid: {
        rows: 3,
        cols: 3,
      },
    });

    const source = world.getTile(1, 1);
    const tiles = world.getTouchingTiles(source);

    expect(tiles).to.have.length(4);
    expect(tiles).to.contain(world.getTile(0, 1));
    expect(tiles).to.contain(world.getTile(2, 1));
    expect(tiles).to.contain(world.getTile(1, 0));
    expect(tiles).to.contain(world.getTile(1, 2));
  });

  it("should correctly return nearby tiles", function () {
    const world = new World({
      grid: {
        rows: 3,
        cols: 3,
      },
    });

    const source = world.getTile(1, 0);
    const tiles = world.getNearTiles(source);

    expect(tiles).to.have.length(5);
    expect(tiles).to.contain(world.getTile(0, 0));
    expect(tiles).to.contain(world.getTile(0, 1));
    expect(tiles).to.contain(world.getTile(1, 1));
    expect(tiles).to.contain(world.getTile(2, 1));
    expect(tiles).to.contain(world.getTile(2, 0));
  });
});
