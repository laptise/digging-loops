import { createContext, useReducer } from "react";
import { PlayInfo } from "../types";
import { Action, playerUIreducer, State } from "./reducer";
export type PlayerCtxType = { state: State; dispatch: React.Dispatch<Action> };

export const playerUIInitialState: State = {
  isViewing: false,
  playInfo: null,
  playStatus: "loading",
  ctx: null,
  play() {},
};

export const PlayerUIContext = createContext<PlayerCtxType>({} as any);

export const usePlayerUiReducer = () => {
  return useReducer(playerUIreducer, playerUIInitialState);
};
