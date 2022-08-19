import { World } from "../../environment/world/world";
import { Random2 } from "../../utils/math/random2";
import { DecisionConfigurator } from "../decision/decision-configurator";

export interface IPlayerConfig {
  world: World;
  decisionConfigurator: DecisionConfigurator;
  random: Random2;
}
