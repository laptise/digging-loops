import { FC, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { Player } from "./player";
import { PlayerProcessorContext, usePlayerProcessor, usePlayerProcessorReducer } from "./processor-context";
import { PlayInfo } from "./types";
import { PlayerUIContext, usePlayerUiReducer } from "./ui-context";
import { PlayStatus } from "./ui-context/reducer";

export const PlayerProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const player = useRef<Player>(null as any);
  const [uiState, uiDispatch] = usePlayerUiReducer();
  const [processorState, processorDispatch] = usePlayerProcessorReducer();
  useEffect(() => {
    player.current = new Player();
    processorDispatch({ type: "SET_PLAYER", player });
  }, []);
  return (
    <PlayerProcessorContext.Provider value={{ state: processorState, dispatch: processorDispatch }}>
      <PlayerUIContext.Provider
        value={{
          state: uiState,
          dispatch: uiDispatch,
        }}
      >
        {children}
      </PlayerUIContext.Provider>
    </PlayerProcessorContext.Provider>
  );
};

export const usePlayerControl = () => {
  const { state, dispatch } = useContext(PlayerUIContext);
  const play = (playInfo: PlayInfo) => dispatch({ type: "PLAY", playInfo });
  return { play, testPlay: state.play };
};

export const DlPlayer = () => {
  const player = usePlayerProcessor();
  const { state, dispatch } = useContext(PlayerUIContext);
  const { isViewing, playInfo, playStatus } = state;
  const display = isViewing ? "flex" : "none";

  const pause = async () => {
    player?.pause();
  };

  const play = async () => {
    await player?.play();
  };

  const stop = async () => {
    player?.stop();
  };

  const volumeChange = (volume: string) => {
    if (player) player.volume = Number(volume);
  };

  const setPlayStatus = (status: PlayStatus) => dispatch({ type: "SET_STATUS", status });
  useEffect(() => {
    if (player) {
      player.onLoadStarted = () => setPlayStatus("loading");
      player.onPlay = () => dispatch({ type: "SET_STATUS", status: "playing" });
      player.onPause = () => setPlayStatus("paused");
      player.onStop = () => setPlayStatus("stopped");
      dispatch({
        type: "SET_PLAY_FN",
        async play(playInfo: PlayInfo) {
          dispatch({ type: "PLAY", playInfo });
          console.log(player);
          await player.setTrack(playInfo.targetUrl);
          await player.play();
        },
      });
    }
  }, [player]);
  return (
    <div
      id="react-use-player"
      style={{ display, bottom: 0, width: "100%", position: "fixed", backgroundColor: "white", left: 0, zIndex: 2000, padding: 10 }}
    >
      {playStatus !== "playing" && playStatus === "loading" && <button>loading</button>}
      {(playStatus === "playing" || playStatus === "paused" || playStatus === "stopped") && <button onClick={stop}>stop</button>}
      {(playStatus === "stopped" || playStatus === "paused") && <button onClick={play}>play</button>}
      {playStatus === "playing" && <button onClick={pause}>pause</button>}
      {playInfo?.trackName || ""}
      <input onChange={(e) => volumeChange(e.target.value)} type="range" max={1} min={0} step={0.001} />
    </div>
  );
};
