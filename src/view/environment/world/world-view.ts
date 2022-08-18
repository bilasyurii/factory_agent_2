import { TileObject } from "../../../core/environment/tile/object/tile-object";
import { TileObjectType } from "../../../core/environment/tile/object/tile-object-type.enum";
import { World } from "../../../core/environment/world/world";
import { TileObjectView } from "../tile/tile-object/tile-object-view";
import { TileView } from "../tile/tile-view";
import { IWorldViewConfig } from "./world-view-config.interface";

export class WorldView extends Phaser.GameObjects.Container {
  private world: World;
  private tilesLayer: Phaser.GameObjects.Container;
  private tileObjectsLayer: Phaser.GameObjects.Container;
  private objects: TileObject[][];

  constructor(config: IWorldViewConfig) {
    super(config.scene);

    this.world = config.world;

    this.initLayers();
    this.initTiles();
  }

  public reset(): void {
    this.tileObjectsLayer.removeAll(true);

    const world = this.world;
    const rows = world.getRows();
    const objects: TileObject[][] = [];
    this.objects = objects;

    for (let row = 0; row < rows; ++row) {
      objects.push([]);
    }
  }

  public updateView(): void {
    const world = this.world;
    const rows = world.getRows();
    const cols = world.getCols();
    const objectsGrid = world.getObjectsGrid();

    for (let row = 0; row < rows; ++row) {
      for (let col = 0; col < cols; ++col) {
        const object = objectsGrid[row][col];

        if (object) {
          this.createTileObjectView(object);
        }
      }
    }
  }

  private initLayers(): void {
    this.tilesLayer = this.makeLayer();
    this.tileObjectsLayer = this.makeLayer();
  }

  private initTiles(): void {
    const scene = this.scene;
    const texture = 'platform';
    const layer = this.tilesLayer;
    const world = this.world;
    const rows = world.getRows();
    const cols = world.getCols();

    for (let row = 0; row < rows; ++row) {
      for (let col = 0; col < cols; ++col) {
        const tile = world.getTile(col, row);
        const tileView = new TileView({
          scene,
          texture,
          tile,
        });
        layer.add(tileView);
      }
    }
  }

  private makeLayer(): Phaser.GameObjects.Container {
    const layer = new Phaser.GameObjects.Container(this.scene);
    this.add(layer);
    return layer;
  }

  private createTileObjectView(tileObject: TileObject): TileObjectView {
    const tile = tileObject.getTile();
    const texture = this.getObjectTextureKey(tileObject);
    const view = new TileObjectView({
      scene: this.scene,
      tileObject,
      texture,
    });
    this.tileObjectsLayer.add(view);
    this.objects[tile.getY()][tile.getX()] = tileObject;
    return view;
  }

  private getObjectTextureKey(tileObject: TileObject): string {
    const type = tileObject.getType();

    switch (type) {
      case TileObjectType.Factory:
        return 'assembly_orange';
      case TileObjectType.IronMine:
        return 'mine_iron';
      default:
        return null;
    }
  }
}
