import { expect } from "chai";
import { TileObjectType } from "../../../../../src/core/environment/tile/object/tile-object-type.enum";
import { TypeDecisionGenerator } from "../../../../../src/core/simulation/decision/type-decision/type-decision-generator";
import { Random2 } from "../../../../../src/core/utils/math/random2";
import { ObjectUtils } from "../../../../../src/core/utils/object-utils";

describe("TypeDecisionGenerator", function () {
  it("should produce each kind of type", function () {
    const random = new Random2();
    const decisionRoundsCount = 5;
    const typeDecisionGenerator = new TypeDecisionGenerator({
      random,
      decisionRoundsCount,
    });

    let occurrences: Record<TileObjectType, number> = <any>{};

    for (let i = 0; i < decisionRoundsCount; ++i) {
      const type = typeDecisionGenerator.next();

      if (occurrences[type]) {
        ++occurrences[type];
      } else {
        occurrences[type] = 1;
      }
    }

    ObjectUtils.forInEnum<TileObjectType>(TileObjectType, (type) => {
      expect(occurrences[type]).to.exist.and.to.be.greaterThanOrEqual(1);
    });
  });
});
