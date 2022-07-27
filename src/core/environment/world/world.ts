import { TileObject } from "../tile/object/tile-object";
import { Tile } from "../tile/tile";
import { IWorldConfig } from "./world-config.interface";
import { IWorldGridConfig } from "./world-grid-config.interface";

export class World {
  private grid: Tile[][] = [];

  constructor(config: IWorldConfig) {
    this.initGrid(config.grid);
  }

  public setTileObject(x: number, y: number, object: TileObject): void {
    this.getTile(x, y)?.setObject(object);
  }

  private initGrid(config: IWorldGridConfig): void {
    const grid = this.grid;
    const rows = config.rows;
    const cols = config.cols;

    for (let row = 0; row < rows; ++row) {
      const rowArray: Tile[] = [];
      grid.push(rowArray);

      for (let col = 0; col < cols; ++col) {
        rowArray.push(new Tile(col, row));
      }
    }
  }

  private getTile(x: number, y: number): Tile {
    const row = this.grid[y];
    return row ? row[x] || null : null;
  }
}
