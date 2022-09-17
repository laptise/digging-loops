import { PlayInfo } from "../types";

export type PlayStatus = "playing" | "stopped" | "paused" | "loading";

export type Action =
  | { type: "PLAY"; playInfo: PlayInfo | null }
  | { type: "STOP" }
  | { type: "SET_STATUS"; status: PlayStatus }
  | { type: "SET_PLAY_FN"; play: (playInfo: PlayInfo) => Promise<void> };

export type State = {
  isViewing: boolean;
  playStatus: PlayStatus;
  playInfo: PlayInfo | null;
  ctx: AudioContext | null;
  play(playInfo: PlayInfo): void;
};

export const playerUIreducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "PLAY":
      return {
        ...state,
        isViewing: true,
        playInfo: action.playInfo || null,
      };
    case "STOP":
      return {
        ...state,
        isViewing: false,
      };
    case "SET_PLAY_FN":
      return {
        ...state,
        play: action.play,
      };
    case "SET_STATUS":
      return { ...state, playStatus: action.status };
    default:
      return state;
  }
};
