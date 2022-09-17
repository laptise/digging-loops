import { createContext, MutableRefObject, useContext, useReducer } from "react";
import { Player } from "../player";
import { playerProceesorReducer } from "./reducer";

type Action = { type: "SET_PLAYER"; player: MutableRefObject<Player> };

type State = {
  player: MutableRefObject<Player>;
};
type ProcessorCtxType = { state: State; dispatch: React.Dispatch<Action> };

export const PlayerProcessorContext = createContext<ProcessorCtxType>({} as ProcessorCtxType);

const initState = {};

export const usePlayerProcessorReducer = () => {
  return useReducer(playerProceesorReducer, {} as any);
};

export const usePlayerProcessor = () => {
  return useContext(PlayerProcessorContext)?.state?.player?.current;
};
