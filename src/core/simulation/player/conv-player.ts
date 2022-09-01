import {
  deepqlearn,
  LayerOptionsSugarType,
  TrainerOptions,
} from "convnetjs-ts";
import { AbstractPlayer } from "./player.abstract";
import { AbstractAction } from "../action/action.abstract";
import { DecideAction } from "../action/decide-action";
import { ObjectUtils } from "../../utils/object-utils";
import { TileObjectType } from "../../environment/tile/object/tile-object-type.enum";

export class ConvPlayer extends AbstractPlayer {
  private static readonly OBJECT_TYPES =
    ObjectUtils.enumToArray<TileObjectType>(TileObjectType);
  private brain: deepqlearn.Brain = null;

  public act(): AbstractAction {
    const environmentState = this.readEnvironmentState();
    const actionCode = this.brain.forward(environmentState);
    return this.parseAction(actionCode);
  }

  public learn(reward: number): void {
    this.brain.backward(reward);
  }

  public destroy(): void {
    this.brain = null;
  }

  protected onSetup(): void {
    this.initAgent();
  }

  private initAgent(): void {
    const num_inputs = this.getStatesCount();
    const num_actions = this.getActionsCount();
    const temporal_window = 1; // amount of temporal memory. 0 = agent lives in-the-moment
    const network_size =
      num_inputs * temporal_window + num_actions * temporal_window + num_inputs;

    const layer_defs: LayerOptionsSugarType[] = [];
    layer_defs.push({
      type: "input",
      out_sx: 1,
      out_sy: 1,
      out_depth: network_size,
    });
    layer_defs.push({
      type: "fc",
      num_neurons: 50,
      activation: "relu",
    });
    layer_defs.push({
      type: "fc",
      num_neurons: 50,
      activation: "relu",
    });
    layer_defs.push({
      type: "regression",
      num_neurons: num_actions,
    } as any);

    const tdtrainer_options: TrainerOptions = {
      learning_rate: 0.001,
      momentum: 0,
      batch_size: 64,
      l2_decay: 0.01,
    };

    const opt: deepqlearn.BrainOptions = {};
    opt.temporal_window = temporal_window;
    opt.experience_size = 30000;
    opt.start_learn_threshold = 1000;
    opt.gamma = 0.7;
    opt.learning_steps_total = 200000;
    opt.learning_steps_burnin = 3000;
    opt.epsilon_min = 0.05;
    opt.epsilon_test_time = 0.05;
    opt.layer_defs = layer_defs;
    opt.tdtrainer_options = tdtrainer_options;

    this.brain = new deepqlearn.Brain(num_inputs, num_actions, opt);
  }

  private readEnvironmentState(): number[] {
    const environmentState: number[] = [];
    const decisionConfigurator = this.decisionConfigurator;
    const newObjectType = decisionConfigurator.getTileObjectType();
    const newObjectTypeCode = ConvPlayer.getTileObjectTypeCode(newObjectType);
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
        const tileObjectTypeCode =
          ConvPlayer.getTileObjectTypeCode(tileObjectType);
        environmentState.push(tileObjectTypeCode);
      }
    }

    return environmentState;
  }

  private static getTileObjectTypeCode(type: TileObjectType): number {
    return (
      (ConvPlayer.OBJECT_TYPES.indexOf(type) + 1) /
      ConvPlayer.OBJECT_TYPES.length
    );
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
