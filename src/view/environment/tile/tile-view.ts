import { GameConfig } from "../../../config/game-config";
import { Tile } from "../../../core/environment/tile/tile";
import { ITileViewConfig } from "./tile-view-config.interface";

export class TileView extends Phaser.GameObjects.Sprite {
  private tile: Tile;

  constructor(config: ITileViewConfig) {
    super(config.scene, 0, 0, config.texture);

    this.tile = config.tile;

    this.updateView();
  }

  public getTile(): Tile {
    return this.tile;
  }

  private updateView(): void {
    const tile = this.tile;
    const size = GameConfig.View.TileSize;
    this.setPosition(tile.getX() * size, tile.getY() * size);
    this.setOrigin(0, 0);
  }
}
