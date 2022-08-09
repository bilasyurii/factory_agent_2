import RL from './rl/rl';
import { AbstractPlayer } from './player.abstract';
import { World } from '../../environment/world/world';
import { AbstractAction } from '../action/action.abstract';
import { PlaceAction } from '../action/place-action';
import { TileObjectType } from '../../environment/tile/object/tile-object-type.enum';

export class AIPlayer extends AbstractPlayer {
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

  protected onPrepared(): void {
    this.initAgent();
  }

  private initAgent(): void {
    const world = this.world;
    const states = world.getRows() * world.getCols();
    const actions = 2;
    const environment: RL.IEnvironment = {
      getNumStates: function () { return states; },
      getMaxNumActions: function () { return actions; },
    };

    this.agent = new RL.DQNAgent(environment, {
      gamma: 0.5,
      epsilon: 0.05,
      alpha: 0.01,
      experience_add_every: 1,
      experience_size: 20000,
      learning_steps_per_iteration: 20,
      num_hidden_units: 300,
    });
  }

  private readEnvironmentState(): RL.EnvironmentState {
    const world = this.world;
    const environmentState: RL.EnvironmentState = [];
    const objectTypes = world.getObjectTypesGrid();

    return environmentState;
  }

  private parseAction(action: number): AbstractAction {
    return new PlaceAction(1, 1, TileObjectType.Factory);
  }
}
