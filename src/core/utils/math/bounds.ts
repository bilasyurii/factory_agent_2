import { IVector } from "./vector.interface";

export class Bounds {
  private minX: number = 0;
  private maxX: number = 0;
  private minY: number = 0;
  private maxY: number = 0;

  public getMinX(): number {
    return this.minX;
  }

  public getMaxX(): number {
    return this.maxX;
  }

  public getMinY(): number {
    return this.minY;
  }

  public getMaxY(): number {
    return this.maxY;
  }

  public getWidth(): number {
    return this.maxX - this.minX;
  }

  public getHeight(): number {
    return this.maxY - this.minY;
  }

  public expand(amount: number): this {
    this.minX -= amount;
    this.minY -= amount;
    this.maxX += amount;
    this.maxY += amount;
    return this;
  }

  public containsVec(vec: IVector): boolean {
    return this.containsXY(vec.x, vec.y);
  }

  public containsXY(x: number, y: number): boolean {
    return (
      x >= this.minX
      && x <= this.maxX
      && y >= this.minY
      && y <= this.maxY
    );
  }

  public copyFrom(bounds: Bounds): this {
    this.minX = bounds.minX;
    this.maxX = bounds.maxX;
    this.minY = bounds.minY;
    this.maxY = bounds.maxY;
    return this;
  }

  public setFromMinMax(minX: number, maxX: number, minY: number, maxY: number): this {
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
    return this;
  }

  public setFromSize(x: number, y: number, width: number, height: number): this {
    this.minX = x;
    this.maxX = x + width;
    this.minY = y;
    this.maxY = y + height;
    return this;
  }

  public setEmpty(): this {
    this.minX = Infinity;
    this.maxX = -Infinity;
    this.minY = Infinity;
    this.maxY = -Infinity;
    return this;
  }
}
