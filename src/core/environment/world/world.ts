import { Bounds } from "../../utils/math/bounds";
import { Math2 } from "../../utils/math/math2";
import { TileObject } from "../tile/object/tile-object";
import { TileObjectType } from "../tile/object/tile-object-type.enum";
import { Tile } from "../tile/tile";
import { IWorldConfig } from "./world-config.interface";
import { IWorldGridConfig } from "./world-grid-config.interface";

export class World {
  private grid: Tile[][] = [];
  private rows: number;
  private cols: number;

  constructor(config: IWorldConfig) {
    this.initGrid(config.grid);
  }

  public getRows(): number {
    return this.rows;
  }

  public getCols(): number {
    return this.cols;
  }

  public setTileObject(x: number, y: number, object: TileObject): void {
    this.getTile(x, y)?.setObject(object);
  }

  public getObjectAt(x: number, y: number): TileObject {
    return this.getTile(x, y)?.getObject() || null;
  }

  public getTilesInBounds(bounds: Bounds): Tile[] {
    const tiles: Tile[] = [];
    const minX = Math2.max(bounds.getMinX(), 0);
    const minY = Math2.max(bounds.getMinY(), 0);
    const maxX = Math2.min(bounds.getMaxX(), this.cols - 1);
    const maxY = Math2.min(bounds.getMaxY(), this.rows - 1);

    for (let row = minY; row <= maxY; ++row) {
      for (let col = minX; col <= maxX; ++col) {
        tiles.push(this.getTile(col, row));
      }
    }

    return tiles;
  }

  public getEmptyTilesCount(): number {
    let count = 0;

    const rows = this.rows;
    const cols = this.cols;

    for (let row = 0; row < rows; ++row) {
      for (let col = 0; col < cols; ++col) {
        const tile = this.getTile(col, row);
        const object = tile.getObject();

        if (!object) {
          ++count;
        }
      }
    }

    return count;
  }

  public getObjectTypesGrid(): TileObjectType[][] {
    const types: TileObjectType[][] = [];
    const rows = this.rows;
    const cols = this.cols;

    for (let row = 0; row < rows; ++row) {
      const typesRow: TileObjectType[] = [];

      types.push(typesRow);

      for (let col = 0; col < cols; ++col) {
        const tile = this.getTile(col, row);
        const object = tile.getObject();
        typesRow.push(object?.getType() || null);
      }
    }

    return types;
  }

  private initGrid(config: IWorldGridConfig): void {
    const grid = this.grid;
    const rows = config.rows;
    const cols = config.cols;

    this.rows = rows;
    this.cols = cols;

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
