import { IActionContext } from "./action-context.interface";

export abstract class AbstractAction {
  protected context: IActionContext;

  public setup(context: IActionContext): void {
    this.context = context;
  }

  public abstract execute(): void;
}
