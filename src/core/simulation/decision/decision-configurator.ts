import { TileObjectType } from "../../environment/tile/object/tile-object-type.enum";
import { Tile } from "../../environment/tile/tile";
import { World } from "../../environment/world/world";
import { Bounds } from "../../utils/math/bounds";
import { Math2 } from "../../utils/math/math2";
import { Random2 } from "../../utils/math/random2";
import { IVector } from "../../utils/math/vector.interface";
import { IDecisionConfiguratorConfig } from "./decision-configurator-config.interface";
import { TypeDecisionGenerator } from "./type-decision-generator";

export type DecisionOption = IVector;

export class DecisionConfigurator {
  private world: World;
  private random: Random2;
  private typeDecisionGenerator: TypeDecisionGenerator;
  private tileObjectType: TileObjectType;
  private prevBounds: Bounds = new Bounds();
  private nextBounds: Bounds = new Bounds();
  private options: DecisionOption[];
  private amountNeeded: number;
  private maxCount: number;

  constructor(config: IDecisionConfiguratorConfig) {
    this.world = config.world;
    this.random = config.random;
    this.maxCount = config.maxCount;

    this.initTypeDecisionGenerator();
  }

  public getOptionsMaxCount(): number {
    return this.maxCount;
  }

  public getTileObjectType(): TileObjectType {
    return this.tileObjectType;
  }

  public getOptions(): DecisionOption[] {
    return this.options.slice(0);
  }

  public configure(): void {
    this.tileObjectType = this.typeDecisionGenerator.next();

    const options: DecisionOption[] = [];
    this.options = options;

    const world = this.world;
    const random = this.random;
    const startingSize = 2;

    this.prevBounds.setEmpty();
    this.nextBounds.setFromSize(
      random.intBetween(0, world.getCols() - startingSize + 1),
      random.intBetween(0, world.getRows() - startingSize + 1),
      startingSize - 1,
      startingSize - 1
    );

    this.amountNeeded = Math.min(this.maxCount, world.getEmptyTilesCount());

    this.scanBounds();
  }

  public reset(): void {
    this.typeDecisionGenerator.reset();
  }

  private initTypeDecisionGenerator(): void {
    this.typeDecisionGenerator = new TypeDecisionGenerator({
      random: this.random,
      decisionsCount: this.maxCount,
    });
  }

  private scanBounds(): void {
    const nextBounds = this.nextBounds;
    let tiles = this.world.getTilesInBounds(nextBounds);
    tiles = tiles.filter(this.filterTilesPredicate, this);

    const options = this.options;
    let amountNeeded = this.amountNeeded;
    const count = Math2.min(amountNeeded, tiles.length);

    for (let i = 0; i < count; ++i) {
      const tile = tiles[i];
      options.push({
        x: tile.getX(), 
        y: tile.getY(),
      });
      --amountNeeded;
    }

    if (amountNeeded) {
      this.amountNeeded = amountNeeded;
      this.prevBounds.copyFrom(nextBounds);
      nextBounds.expand(1);
      this.scanBounds();
    }
  }

  private filterTilesPredicate(tile: Tile): boolean {
    if (tile.getObject()) {
      return false;
    }

    return !this.prevBounds.containsXY(tile.getX(), tile.getY());
  }
}
