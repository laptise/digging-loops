import { MutableRefObject, useReducer } from "react";
import { Player } from "../player";

export type Action = { type: "SET_PLAYER"; player: MutableRefObject<Player> };

export type State = {
  player: MutableRefObject<Player>;
};

export const playerProceesorReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PLAYER":
      return { ...state, ...{ player: action.player } };
    default:
      return state;
  }
};
