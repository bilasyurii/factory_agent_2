import { Bounds } from "../../utils/math/bounds";
import { Math2 } from "../../utils/math/math2";
import { IVector } from "../../utils/math/vector.interface";
import { TileObject } from "../tile/object/tile-object";
import { TileObjectType } from "../tile/object/tile-object-type.enum";
import { Tile } from "../tile/tile";
import { IWorldConfig } from "./world-config.interface";

export class World {
  private static readonly TOUCHING_OFFSETS: IVector[] = [
    { x: +0, y: -1 },
    { x: -1, y: +0 },
    { x: +1, y: +0 },
    { x: +0, y: +1 },
  ];
  private static readonly NEAR_OFFSETS: IVector[] = [
    { x: -1, y: -1 },
    { x: +0, y: -1 },
    { x: +1, y: -1 },
    { x: -1, y: +0 },
    { x: +1, y: +0 },
    { x: -1, y: +1 },
    { x: +0, y: +1 },
    { x: +1, y: +1 },
  ];
  private grid: Tile[][];
  private rows: number;
  private cols: number;

  constructor(config: IWorldConfig) {
    this.rows = config.grid.rows;
    this.cols = config.grid.cols;

    this.initGrid();
  }

  public reset(): void {
    this.initGrid();
  }

  public getRows(): number {
    return this.rows;
  }

  public getCols(): number {
    return this.cols;
  }

  public getTilesCount(): number {
    return this.rows * this.cols;
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

  public getObjectsOfType(type: TileObjectType): TileObject[] {
    const objects: TileObject[] = [];
    const rows = this.rows;
    const cols = this.cols;

    for (let row = 0; row < rows; ++row) {
      for (let col = 0; col < cols; ++col) {
        const tile = this.getTile(col, row);
        const object = tile.getObject();

        if (object && object.getType() === type) {
          objects.push(object);
        }
      }
    }

    return objects;
  }

  public getTouchingTiles(source: Tile): Tile[] {
    return this.getTilesUsingOffsets(source, World.TOUCHING_OFFSETS);
  }

  public getNearTiles(source: Tile): Tile[] {
    return this.getTilesUsingOffsets(source, World.NEAR_OFFSETS);
  }

  public getTile(x: number, y: number): Tile {
    const row = this.grid[y];
    return row ? row[x] || null : null;
  }

  private initGrid(): void {
    const grid: Tile[][] = [];
    this.grid = grid;

    const rows = this.rows;
    const cols = this.cols;

    for (let row = 0; row < rows; ++row) {
      const rowArray: Tile[] = [];
      grid.push(rowArray);

      for (let col = 0; col < cols; ++col) {
        rowArray.push(new Tile(col, row));
      }
    }
  }

  private getTilesUsingOffsets(source: Tile, offsets: IVector[]): Tile[] {
    const tiles: Tile[] = [];
    const tileX = source.getX();
    const tileY = source.getY();
    const offsetsCount = offsets.length;

    for (let i = 0; i < offsetsCount; ++i) {
      const offset = offsets[i];
      const tile = this.getTile(tileX + offset.x, tileY + offset.y);

      if (tile) {
        tiles.push(tile);
      }
    }

    return tiles;
  }
}
