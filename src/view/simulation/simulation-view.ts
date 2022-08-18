import { World } from "../../core/environment/world/world";
import { WorldView } from "../environment/world/world-view";
import { ISimulationViewConfig } from "./simulation-view-config.interface";

export class SimulationView extends Phaser.GameObjects.Container {
  private worldView: WorldView;

  constructor(config: ISimulationViewConfig) {
    super(config.scene);

    this.initWorldView(config.world);
  }

  public reset(): void {
    this.worldView.reset();
  }

  public updateView(): void {
    this.worldView.updateView();
  }

  private initWorldView(world: World): void {
    const worldView = new WorldView({
      scene: this.scene,
      world,
    });
    this.worldView = worldView;
    this.add(worldView);
  }
}
