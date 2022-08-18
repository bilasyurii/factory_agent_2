import { GameConfig } from "./game-config";

export const PhaserConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: "red",
  width: GameConfig.Width,
  height: GameConfig.Height,
};
