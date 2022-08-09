import { World } from "../../environment/world/world";
import { DecisionConfigurator } from "../decision/decision-configurator";

export interface IPlayerConfig {
  world: World;
  decisionConfigurator: DecisionConfigurator;
}
