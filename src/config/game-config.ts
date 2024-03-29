import { RLPlayer } from "../core/simulation/player/rl-player";
import { PlayerType } from "../core/simulation/player/player-type.enum";
import { AbstractPlayer } from "../core/simulation/player/player.abstract";
import { RandomPlayer } from "../core/simulation/player/random-player";
import { ConvPlayer } from "../core/simulation/player/conv-player";

const playerType: PlayerType = PlayerType.DQN_CONV;

export const GameConfig = {
  Width: 900,
  Height: 600,
  StepInterval: 1,
  Runner: {
    StepsPerTick: 10,
    ChangeSeedEveryNthIteration: 1,
  },
  Simulation: {
    playerClass: getPlayerClassByType(playerType),
  },
  Decision: {
    MaxCount: 4,
  },
  World: {
    Rows: 7,
    Cols: 7,
  },
  View: {
    TileSize: 50,
    Scale: 0.75,
  },
};

function getPlayerClassByType(type: PlayerType): new () => AbstractPlayer {
  switch (type) {
    case PlayerType.Random:
      return RandomPlayer;
    case PlayerType.DQN_RL:
      return RLPlayer;
    case PlayerType.DQN_CONV:
      return ConvPlayer;
  }
}
