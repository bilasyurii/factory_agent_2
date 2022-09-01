import { Math2 } from "../../../core/utils/math/math2";
import { ISimpleChartConfig } from "./simple-chart-config.interface";

export class SimpleChart extends Phaser.GameObjects.Container {
  private config: ISimpleChartConfig;
  private records: number[];
  private recordsGraphics: Graphics;
  private maxValue: number;
  private minValue: number;
  private tickMarks: PhaserText[];

  constructor(scene: Scene, config: ISimpleChartConfig) {
    super(scene);

    this.config = config;
    this.records = [];
    this.maxValue = 0;
    this.minValue = Infinity;
    this.tickMarks = [];

    this.initBg();
    this.initRecordsGraphics();
    this.initTickMarks();
  }

  public getData(): number[] {
    return this.records;
  }

  public getWidth(): number {
    return this.config.width;
  }

  public getHeight(): number {
    return this.config.height;
  }

  public addRecord(value: number): void {
    const records = this.records;
    records.push(Math2.max(0, value));

    if (records.length > this.config.capacity) {
      records.shift();
    }

    this.maxValue = Math2.max(this.maxValue, value);
    this.minValue = Math2.min(this.minValue, value);
    this.tickMarks.forEach((tickMark) => tickMark.setVisible(true));
    this.drawRecords();
    this.updateTickMarks();
  }

  private initBg(): void {
    const bg = new Phaser.GameObjects.Graphics(this.scene, {
      fillStyle: {
        color: 0x333333,
      },
    });
    this.add(bg);
    bg.fillRect(0, 0, this.getWidth(), this.getHeight());
  }

  private initRecordsGraphics(): void {
    const graphics = new Phaser.GameObjects.Graphics(this.scene);
    this.recordsGraphics = graphics;
    this.add(graphics);
  }

  private initTickMarks(): void {
    const count = this.config.tickMarksCount;

    for (let i = 0; i < count; ++i) {
      this.createTickMark().setVisible(false);
    }
  }

  private createTickMark(): PhaserText {
    const tickMark = new Phaser.GameObjects.Text(this.scene, 0, 0, "", {
      color: "white",
      align: "right",
      fontFamily: "Consolas",
      fontSize: "10pt",
    });
    this.add(tickMark);
    this.tickMarks.push(tickMark);
    tickMark.setOrigin(1, 0.5);
    tickMark.setX(this.getWidth() - 5);
    return tickMark;
  }

  private drawRecords(): void {
    const graphics = this.recordsGraphics;
    graphics.clear();
    graphics.fillStyle(this.config.lineColor);

    const records = this.records;
    const count = records.length;
    const stepX = this.getWidth() / (count - 1);
    const height = this.getHeight();
    const minValue = this.minValue;
    const amplitude = this.maxValue - minValue;
    const stepY = height / amplitude;

    records.forEach((record, i) => {
      const x = i * stepX;
      const y = height - (record - minValue) * stepY;

      graphics.fillPoint(x, y, 3);
    });
  }

  private updateTickMarks(): void {
    const tickMarks = this.tickMarks;
    const count = tickMarks.length;
    const height = this.getHeight();
    const minValue = this.minValue;
    const amplitude = this.maxValue - minValue;
    const stepValue = amplitude / (count - 1);
    const stepY = height / (count - 1);

    tickMarks.forEach((tickMark, i) => {
      tickMark.setY(height - i * stepY);

      const value = i * stepValue + minValue;
      tickMark.setText(value.toFixed(2));
    });
  }
}
