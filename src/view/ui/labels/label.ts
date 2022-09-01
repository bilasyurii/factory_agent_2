export class Label extends Phaser.GameObjects.Text {
  private labelName: string;
  private value: number;

  constructor(scene: Scene, name: string, defaultValue: number = 0) {
    super(scene, 0, 0, "", {
      color: "yellow",
      align: "left",
      fontFamily: "Consolas",
      fontSize: "20pt",
    });

    this.labelName = name;
    this.value = defaultValue;

    this.setOrigin(0, 0.5);
    this.setValue(defaultValue);
  }

  public setValue(value: number): void {
    this.value = value;
    this.updateLabelText();
  }

  public getValue(): number {
    return this.value;
  }

  public increment(amount: number = 1): void {
    this.value += amount;
    this.updateLabelText();
  }

  private updateLabelText(): void {
    this.setText(this.labelName + this.value);
  }
}
