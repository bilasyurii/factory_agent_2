import { GameConfig } from "../../config/game-config";
import { ScoreDisplay } from "./score-display";

export class UI extends Phaser.GameObjects.Container {
  private scoreDisplay: ScoreDisplay;

  constructor(scene: Scene) {
    super(scene);

    this.initScoreDisplay();
  }

  public setScore(score: number): void {
    this.scoreDisplay.setScore(score);
  }

  private initScoreDisplay(): void {
    const scoreDisplay = new ScoreDisplay(this.scene);
    this.scoreDisplay = scoreDisplay;
    this.add(scoreDisplay);
    scoreDisplay.setPosition(GameConfig.Width - 200, 25);
  }
}
