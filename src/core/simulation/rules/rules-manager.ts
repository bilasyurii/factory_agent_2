import { FactoryRules } from "./factory-rules";
import { IronMineRules } from "./iron-mine-rules";
import { IRuleContext } from "./rule-context.interface";
import { AbstractRule } from "./rule.abstract";

export class RulesManager {
  private context: IRuleContext;
  private rules: AbstractRule[] = [];

  constructor(context: IRuleContext) {
    this.context = context;
  }

  public registerRule(rule: AbstractRule): void {
    this.rules.push(rule);
    rule.setContext(this.context);
  }

  public reset(): void {
    this.rules = [];
  }

  public evaluate(): number {
    let score = 0;

    this.rules.forEach(function(rule) {
      score += rule.evaluate();
    });

    return score;
  }

  public setupDefaultRules(): void {
    this.registerRule(new FactoryRules());
    this.registerRule(new IronMineRules());
  }
}
