export class ScoreDisplay extends Phaser.GameObjects.Text {
  constructor(scene: Scene) {
    super(scene, 0, 0, "", {
      color: "yellow",
      align: "left",
      fontFamily: "Consolas",
      fontSize: "20pt",
    });

    this.setOrigin(0, 0.5);
    this.setScore(0);
  }

  public setScore(score: number): void {
    this.setText("Score: " + score);
  }
}
