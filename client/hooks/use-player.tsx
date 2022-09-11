import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { fromFetch } from "rxjs/fetch";

type PlayInfo = {
  trackName: string;
  bpm: number;
  targetUrl: string;
};

type Action = { type: "PLAY"; playInfo: PlayInfo } | { type: "STOP" } | { type: "SET_PLAY_FN"; play: (playInfo: PlayInfo) => Promise<void> };

type State = { playing: string | null; isViewing: boolean; playInfo: PlayInfo | null; ctx: AudioContext | null; play(playInfo: PlayInfo): void };

type PlayerCtxType = { state: State; dispatch: React.Dispatch<Action> };

const PlayerContext = createContext<PlayerCtxType>({} as PlayerCtxType);

const initialState: State = {
  isViewing: false,
  playing: null,
  playInfo: null,
  ctx: null,
  play() {},
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "PLAY":
      return {
        ...state,
        isViewing: true,
        playInfo: action.playInfo,
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
    default:
      return state;
  }
};

export const PlayerProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <PlayerContext.Provider value={{ state, dispatch }}>{children}</PlayerContext.Provider>;
};

const _appendBuffer = function (buffer1: ArrayBuffer, buffer2: ArrayBuffer) {
  const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp.buffer;
};

export const usePlayerControl = () => {
  const { state, dispatch } = useContext(PlayerContext);
  const play = (playInfo: PlayInfo) => dispatch({ type: "PLAY", playInfo });
  return { play, testPlay: state.play };
};

type PlayStatus = "playing" | "stopped" | "paused" | "loading";

export const DlPlayer = () => {
  const { state, dispatch } = useContext(PlayerContext);
  const { isViewing, playInfo } = state;
  const display = isViewing ? "flex" : "none";
  const ctx = useRef<AudioContext>();
  const buffer = useRef<ArrayBuffer>();
  const audioBuffer = useRef<AudioBuffer>();
  const [playStatus, setPlayStatus] = useState<PlayStatus>("loading");

  const pause = async () => {
    ctx.current!.suspend();
    setPlayStatus("paused");
  };

  const play = async () => {
    ctx.current!.resume();
    setPlayStatus("playing");
  };

  const stop = async () => {
    await ctx.current!.close();
    ctx.current = new AudioContext();
    const src = ctx.current!.createBufferSource();
    src.buffer = audioBuffer.current!;
    src.connect(ctx.current!.destination);
    src.start();
    ctx.current!.suspend();
    setPlayStatus("stopped");
  };

  useEffect(() => {
    dispatch({
      type: "SET_PLAY_FN",
      async play(playInfo: PlayInfo) {
        setPlayStatus("loading");
        dispatch({ type: "PLAY", playInfo });
        if (ctx.current) {
          await ctx.current!.suspend?.();
          await ctx.current!.close?.();
        }
        ctx.current = new AudioContext();
        if (playInfo) {
          const { targetUrl } = playInfo;
          const $data = fromFetch(targetUrl, {
            selector(res) {
              return res.arrayBuffer();
            },
          });
          buffer.current = new ArrayBuffer(0);
          $data.subscribe({
            next: (result) => {
              buffer.current = _appendBuffer(buffer.current!, result);
            },
            complete: async () => {
              if (ctx) {
                setPlayStatus("playing");
                const src = ctx.current!.createBufferSource();
                audioBuffer.current = await ctx.current!.decodeAudioData(buffer.current!);
                src.buffer = audioBuffer.current!;
                src.connect(ctx.current!.destination);
                src.start();
              }
            },
          });
        }
      },
    });
  }, []);
  return (
    <div
      id="react-use-player"
      style={{ display, bottom: 0, width: "100%", position: "fixed", backgroundColor: "white", left: 0, zIndex: 2000, padding: 10 }}
    >
      {playStatus === "loading" && <button>loading</button>}
      {(playStatus === "playing" || playStatus === "paused" || playStatus === "stopped") && <button onClick={stop}>stop</button>}
      {(playStatus === "stopped" || playStatus === "paused") && <button onClick={play}>play</button>}
      {playStatus === "playing" && <button onClick={pause}>pause</button>}
      {playInfo?.trackName || ""}
    </div>
  );
};
