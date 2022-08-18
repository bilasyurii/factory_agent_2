import { GameConfig } from "../../config/game-config";
import { SimpleChart } from "./chart/simple-chart";
import { ScoreDisplay } from "./score-display";

export class UI extends Phaser.GameObjects.Container {
  private scoreDisplay: ScoreDisplay;
  private chart: SimpleChart;

  constructor(scene: Scene) {
    super(scene);

    this.initScoreDisplay();
    this.initChart();
  }

  public setScore(score: number): void {
    this.scoreDisplay.setScore(score);
  }

  public onSimulationEnded(totalScore: number): void {
    this.chart.addRecord(totalScore);
  }

  private initScoreDisplay(): void {
    const scoreDisplay = new ScoreDisplay(this.scene);
    this.scoreDisplay = scoreDisplay;
    this.add(scoreDisplay);
    scoreDisplay.setPosition(GameConfig.Width - 200, 25);
  }

  private initChart(): void {
    const chart = new SimpleChart(this.scene, {
      width: 300,
      height: 200,
      tickMarksCount: 4,
    });
    this.chart = chart;
    this.add(chart);
    chart.setPosition(GameConfig.Width - chart.getWidth() - 50, 75);
  }
}
