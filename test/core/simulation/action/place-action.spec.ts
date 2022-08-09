import { expect } from "chai";
import * as sinon from "sinon";
import { TileObjectType } from "../../../../src/core/environment/tile/object/tile-object-type.enum";
import { World } from "../../../../src/core/environment/world/world";
import { IActionContext } from "../../../../src/core/simulation/action/action-context.interface";
import { PlaceAction } from "../../../../src/core/simulation/action/place-action";

describe("PlaceAction", function () {
  it("should set tile's stored object", function () {
    const world = new World({
      grid: {
        rows: 3,
        cols: 3,
      },
    });
    const worldSpy = sinon.spy(world);

    const x = 2;
    const y = 1;
    const objectType = TileObjectType.Factory;
    const action = new PlaceAction(x, y, objectType);

    const actionContext: IActionContext = {
      world,
    };
    action.setup(actionContext);

    action.execute();

    expect(worldSpy.setTileObject.calledOnce).to.be.true;
    expect(worldSpy.setTileObject.calledWith(x, y)).to.be.true;
    expect(worldSpy.setTileObject.getCall(0).args[2].getType()).to.be.equal(objectType);
  });
});
