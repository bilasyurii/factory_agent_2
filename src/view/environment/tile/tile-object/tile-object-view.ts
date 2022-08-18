import { GameConfig } from "../../../../config/game-config";
import { TileObject } from "../../../../core/environment/tile/object/tile-object";
import { ITileObjectViewConfig } from "./tile-object-view-config.interface";

export class TileObjectView extends Phaser.GameObjects.Sprite {
  private tileObject: TileObject;

  constructor(config: ITileObjectViewConfig) {
    super(config.scene, 0, 0, config.texture);

    this.tileObject = config.tileObject;

    this.updateView();
  }

  public getTileObject(): TileObject {
    return this.tileObject;
  }

  private updateView(): void {
    const tile = this.tileObject.getTile();
    const size = GameConfig.View.TileSize;
    this.setPosition(tile.getX() * size, tile.getY() * size);
    this.setOrigin(0, 0);
  }
}
