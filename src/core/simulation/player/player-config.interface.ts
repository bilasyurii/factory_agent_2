import { World } from "../../environment/world/world";
import { DecisionOption } from "../decision/decision-configurator";

export interface IPlayerConfig {
  world: World;
  decisionOptions: DecisionOption[];
}
