import { Random2 } from "./math/random2";

export class ArrayUtils {
  private constructor() { }

  public static removeFirst<T>(array: T[], value: T): boolean {
    const count = array.length;

    for (let i = 0; i < count; ++i) {
      if (array[i] === value) {
        array.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  public static initArray<T>(width: number, height: number, value: T): T[][] {
    const arr: T[][] = [];

    for (let y = 0; y < height; ++y) {
      const row: T[] = [];
      arr.push(row);

      for (let x = 0; x < width; ++x) {
        row.push(value);
      }
    }

    return arr;
  }

  public static fillArray2d(array: any[][], value: any): void {
    const height = array.length;

    for (let y = 0; y < height; ++y) {
      const row = array[y];
      const width = row.length;
  
      for (let x = 0; x < width; ++x) {
        row[x] = value;
      }
    }
  }

  public static clone2d<T>(array: T[][]): T[][] {
    const clone: T[][] = [];
    const height = array.length;

    for (let y = 0; y < height; ++y) {
      const row = array[y];
      const width = row.length;
      const cloneRow: T[] = [];
      clone.push(cloneRow);

      for (let x = 0; x < width; ++x) {
        cloneRow.push(row[x]);
      }
    }

    return clone;
  }

  public static shuffle<T>(array: T[]): T[] {
    const length = array.length;

    for (let i = 0; i < length; ++i) {
      const j = ~~(Math.random() * length);
      const temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }

    return array;
  }

  public static shuffle2<T>(array: T[], random: Random2): T[] {
    const length = array.length;

    for (let i = 0; i < length; ++i) {
      const j = random.int() % length;
      const temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }

    return array;
  }

  public static repeat<T>(pattern: T[], amount: number): T[] {
    const result: T[] = [];
    const patternLength = pattern.length;

    for (let i = 0; i < amount; ++i) {
      for (let j = 0; j < patternLength; ++j) {
        result.push(pattern[j]);
      }
    }

    return result;
  }

  public static pick<T>(array: T[], amount: number): T[] {
    return ArrayUtils.shuffle(array.slice()).slice(amount);
  }

  public static pick2<T>(array: T[], amount: number, random: Random2): T[] {
    return ArrayUtils.shuffle2(array.slice(), random).slice(amount);
  }

  public static multiPick2<T>(array: T[], amount: number, random: Random2): T[] {
    const baseLength = array.length;
    const fullTimesCount = ~~(amount / baseLength);
    const result = ArrayUtils.repeat(array, fullTimesCount);
    const remainderCount = amount - result.length;
    const remainder = ArrayUtils.pick2(array, remainderCount, random);
    ArrayUtils.append(remainder, result);
    ArrayUtils.shuffle2(result, random);
    return result;
  }

  public static append<T>(from: T[], to: T[]): T[] {
    const length = from.length;

    for (let i = 0; i < length; ++i) {
      to.push(from[i]);
    }

    return to;
  }
}
