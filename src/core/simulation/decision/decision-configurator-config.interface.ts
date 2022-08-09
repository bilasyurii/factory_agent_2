import { World } from "../../environment/world/world";
import { Random2 } from "../../utils/math/random2";

export interface IDecisionConfiguratorConfig {
  world: World;
  random: Random2;
  maxCount: number;
}
