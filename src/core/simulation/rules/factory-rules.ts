import { AbstractRule } from "./rule.abstract";

export default class FactoryRules extends AbstractRule {
  public evaluate(): number {
    return 1;
  }
}
