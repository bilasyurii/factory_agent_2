import { TileObjectType } from "../../environment/tile/object/tile-object-type.enum";
import { World } from "../../environment/world/world";
import { DecisionOption } from "../decision/decision-configurator";

export interface IActionContext {
  world: World;
  tileObjectType: TileObjectType;
  decisionOptions: DecisionOption[];
}
