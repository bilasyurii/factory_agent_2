import { TileObjectType } from "../../../environment/tile/object/tile-object-type.enum";
import { ArrayUtils } from "../../../utils/array-utils";
import { Random2 } from "../../../utils/math/random2";
import { ObjectUtils } from "../../../utils/object-utils";
import { ITypeDecisionGeneratorConfig } from "./type-decision-generator-config.interface";

export class TypeDecisionGenerator {
  private static readonly OBJECT_TYPES = ObjectUtils.enumToArray<TileObjectType>(TileObjectType);

  private types: TileObjectType[];
  private decisionsCount: number;
  private random: Random2;

  constructor(config: ITypeDecisionGeneratorConfig) {
    this.decisionsCount = config.decisionRoundsCount;
    this.random = config.random;

    this.reset();
  }

  public next(): TileObjectType {
    return this.types.shift();
  }

  public reset(): void {
    const allTypes = TypeDecisionGenerator.OBJECT_TYPES;
    const count = this.decisionsCount;

    if (count <= allTypes.length) {
      this.types = ArrayUtils.pick2(allTypes, count, this.random);
    } else {
      this.types = ArrayUtils.multiPick2(allTypes, count, this.random);
    }
  }
}
