import { Math2 } from "../../../core/utils/math/math2";
import { ISimpleChartConfig } from "./simple-chart-config.interface";

export class SimpleChart extends Phaser.GameObjects.Container {
  private config: ISimpleChartConfig;
  private records: number[];
  private recordsGraphics: Graphics;
  private maxValue: number;
  private tickMarks: PhaserText[];

  constructor(scene: Scene, config: ISimpleChartConfig) {
    super(scene);

    this.config = config;
    this.records = [ 0 ];
    this.maxValue = 0;
    this.tickMarks = [];

    this.initBg();
    this.initRecordsGraphics();
    this.initTickMarks();
  }

  public getWidth(): number {
    return this.config.width;
  }

  public getHeight(): number {
    return this.config.height;
  }

  public addRecord(value: number): void {
    this.records.push(Math2.max(0, value));
    this.maxValue = Math2.max(this.maxValue, value);
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
    graphics.lineStyle(2, 0xffff00);

    const records = this.records;
    const count = records.length;
    const stepX = this.getWidth() / (count - 1);
    const height = this.getHeight();
    const stepY = height / this.maxValue;

    graphics.moveTo(0, height);
    records.forEach((record, i) => graphics.lineTo(i * stepX, height - record * stepY));
    graphics.stroke();
  }

  private updateTickMarks(): void {
    const tickMarks = this.tickMarks;
    const count = tickMarks.length;
    const height = this.getHeight();
    const stepValue = this.maxValue / count;
    const stepY = height / count;
    
    tickMarks.forEach((tickMark, i) => {
      tickMark.setY(height - (i + 1) * stepY);

      const value = (i + 1) * stepValue;
      tickMark.setText(value.toFixed(2));
    });
  }
}
