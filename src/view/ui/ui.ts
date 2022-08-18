import { GameConfig } from "../../config/game-config";
import { SimpleChart } from "./chart/simple-chart";
import { IterationLabel } from "./labels/iteration-label";
import { ScoreLabel } from "./labels/score-label";

export class UI extends Phaser.GameObjects.Container {
  private scoreLabel: ScoreLabel;
  private iterationLabel: ScoreLabel;
  private chart: SimpleChart;

  constructor(scene: Scene) {
    super(scene);

    this.initScoreLabel();
    this.initIterationLabel();
    this.initChart();
  }

  public setScore(score: number): void {
    this.scoreLabel.setValue(score);
  }

  public onSimulationEnded(totalScore: number): void {
    this.iterationLabel.increment();
    this.chart.addRecord(totalScore);
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
