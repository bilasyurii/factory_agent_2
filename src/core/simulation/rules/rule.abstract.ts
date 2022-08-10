import { World } from "../../environment/world/world";
import { IRuleContext } from "./rule-context.interface";

export abstract class AbstractRule {
  protected world: World;

  public setContext(context: IRuleContext): void {
    this.world = context.world;
  }

  public abstract evaluate(): number;
}
