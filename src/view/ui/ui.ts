import { GameConfig } from "../../config/game-config";
import { SimpleChart } from "./chart/simple-chart";
import { IterationLabel } from "./labels/iteration-label";
import { ScoreLabel } from "./labels/score-label";

export class UI extends Phaser.GameObjects.Container {
  private scoreLabel: ScoreLabel;
  private iterationLabel: ScoreLabel;
  private chart: SimpleChart;
  private averageChart: SimpleChart;

  constructor(scene: Scene) {
    super(scene);

    this.initScoreLabel();
    this.initIterationLabel();
    this.initChart();
    this.initAverageChart();
  }

  public setScore(score: number): void {
    this.scoreLabel.setValue(score);
  }

  public onSimulationEnded(totalScore: number): void {
    this.iterationLabel.increment();
    this.chart.addRecord(totalScore);
    this.averageChart.addRecord(this.getAverage());
  }

  private initScoreLabel(): void {
    const scoreLabel = new ScoreLabel(this.scene);
    this.scoreLabel = scoreLabel;
    this.add(scoreLabel);
    scoreLabel.setPosition(GameConfig.Width - 200, 25);
  }

  private initIterationLabel(): void {
    const iterationLabel = new IterationLabel(this.scene);
    this.iterationLabel = iterationLabel;
    this.add(iterationLabel);
    iterationLabel.setPosition(GameConfig.Width - 200, 50);
  }

  private initChart(): void {
    this.chart = this.createChart(0xffff00, 100, new Phaser.Math.Vector2(GameConfig.Width - 350, 75));
  }

  private initAverageChart(): void {
    this.averageChart = this.createChart(0xff00ff, Infinity, new Phaser.Math.Vector2(GameConfig.Width - 350, 300));
  }

  private createChart(color: number, capacity: number, position: Vector2): SimpleChart {
    const chart = new SimpleChart(this.scene, {
      width: 300,
      height: 200,
      tickMarksCount: 4,
      capacity: capacity,
      lineColor: color,
    });
    this.add(chart);
    chart.copyPosition(position);
    return chart;
  }

  private getAverage(): number {
    const data = this.chart.getData();
    return data.reduce(function (prev, current) {
      return prev + current;
    }, 0) / (data.length || 1);
  }
}
