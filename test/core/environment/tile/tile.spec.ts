import { expect } from "chai";
import Tile from "../../../../src/core/environment/tile/tile";

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
});