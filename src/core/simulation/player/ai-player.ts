import RL from "./rl/rl";
import { AbstractPlayer } from "./player.abstract";
import { AbstractAction } from "../action/action.abstract";
import { DecideAction } from "../action/decide-action";
import { ObjectUtils } from "../../utils/object-utils";
import { TileObjectType } from "../../environment/tile/object/tile-object-type.enum";

export class AIPlayer extends AbstractPlayer {
  private static readonly OBJECT_TYPES = ObjectUtils.enumToArray<TileObjectType>(TileObjectType);
  private agent: RL.DQNAgent = null;

  public act(): AbstractAction {
    const environmentState = this.readEnvironmentState();
    const actionCode = this.agent.act(environmentState);
    return this.parseAction(actionCode);
  }

  public learn(reward: number): void {
    this.agent.learn(reward);
  }

  public destroy(): void {
    this.agent = null;
  }

  protected onSetup(): void {
    this.initAgent();
  }

  private initAgent(): void {
    const environment: RL.IEnvironment = {
      getNumStates: () => this.getStatesCount(),
      getMaxNumActions: () => this.getActionsCount(),
    };

    this.agent = new RL.DQNAgent(environment, {
      gamma: 0.5,
      epsilon: 0.05,
      alpha: 0.1,
      experience_add_every: 1,
      experience_size: 5000,
      learning_steps_per_iteration: 20,
      num_hidden_units: 300,
    });
  }

  private readEnvironmentState(): RL.EnvironmentState {
    const environmentState: RL.EnvironmentState = [];
    const decisionConfigurator = this.decisionConfigurator;
    const newObjectType = decisionConfigurator.getTileObjectType();
    const newObjectTypeCode = AIPlayer.getTileObjectTypeCode(newObjectType);
    environmentState.push(newObjectTypeCode);

    const world = this.world;
    const objectTypes = world.getObjectTypesGrid();
    const rows = world.getRows();
    const cols = world.getCols();

    const options = decisionConfigurator.getOptions();
    const optionsCount = options.length;

    for (let i = 0; i < optionsCount; ++i) {
      const option = options[i];
      environmentState.push(option.x / (cols - 1));
      environmentState.push(option.y / (rows - 1));
    }

    for (let row = 0; row < rows; ++row) {
      const rowArray = objectTypes[row];

      for (let col = 0; col < cols; ++col) {
        const tileObjectType = rowArray[col];
        const tileObjectTypeCode = AIPlayer.getTileObjectTypeCode(tileObjectType);
        environmentState.push(tileObjectTypeCode);
      }
    }

    return environmentState;
  }

  private static getTileObjectTypeCode(type: TileObjectType): number {
    return (AIPlayer.OBJECT_TYPES.indexOf(type) + 1) / AIPlayer.OBJECT_TYPES.length;
  }

  private parseAction(action: number): AbstractAction {
    return new DecideAction(action);
  }

  private getStatesCount(): number {
    const objectType = 1;
    const options = this.decisionConfigurator.getOptionsMaxCount();
    const world = this.world;
    const tiles = world.getRows() * world.getCols();
    return objectType + options * 2 + tiles;
  }
}
