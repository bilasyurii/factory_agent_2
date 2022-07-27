import { expect } from "chai";
import { TileObject } from "../../../../src/core/environment/tile/object/tile-object";
import { TileObjectType } from "../../../../src/core/environment/tile/object/tile-object-type.enum";
import { Tile } from "../../../../src/core/environment/tile/tile";

describe("Tile", function () {
  it("should be able to store coordinates", function () {
    const x = 4;
    const y = 2;
    const tile = new Tile(x, y);

    const storedX = tile.getX();
    const storedY = tile.getY();

    expect(storedX).to.be.equal(x);
    expect(storedY).to.be.equal(y);
  });

  it("should be able to store correct object after any link manipulations", function () {
    const tile1 = new Tile(0, 0);
    const tile2 = new Tile(1, 1);

    const object1 = new TileObject(TileObjectType.Factory);
    const object2 = new TileObject(TileObjectType.PowerPlant);

    tile1.setObject(object1);

    expect(tile1.getObject()).to.be.equal(object1);
    expect(tile2.getObject()).not.to.exist;

    tile2.setObject(object2);

    expect(tile1.getObject()).to.be.equal(object1);
    expect(tile2.getObject()).to.be.equal(object2);

    tile1.setObject(object2);

    expect(tile1.getObject()).to.be.equal(object2);
    expect(tile2.getObject()).not.to.exist;

    tile2.setObject(object1);

    expect(tile1.getObject()).to.be.equal(object2);
    expect(tile2.getObject()).to.be.equal(object1);
  });
});
