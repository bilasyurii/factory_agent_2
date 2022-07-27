export class Math2 {
  private constructor() { }

  public static normalizeLogarithmic(value: number, multiplier: number, logBase: number): number {
    const raw = value / multiplier;
    const log = Math.log(raw) / Math.log(logBase);

    if (log <= 1) {
      return 0.5 * (raw / logBase);
    } else {
      const decrement = 1 / Math.pow(2, log);
      return 1 - decrement;
    }
  }

  public static normalizeLogarithmicSigned(value: number, multiplier: number, logBase: number): number {
    if (value < 0) {
      return -Math2.normalizeLogarithmic(-value, multiplier, logBase);
    } else {
      return Math2.normalizeLogarithmic(value, multiplier, logBase);
    }
  }
}
