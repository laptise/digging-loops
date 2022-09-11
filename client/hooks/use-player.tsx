import { createContext, FC, ReactNode, useContext, useEffect, useReducer, useState } from "react";
import { fromFetch } from "rxjs/fetch";

type PlayInfo = {
  trackName: string;
  bpm: number;
  targetUrl: string;
};

type Action = { type: "PLAY"; playInfo: PlayInfo } | { type: "STOP" };

type State = { playing: string | null; isViewing: boolean; playInfo: PlayInfo | null; ctx: AudioContext | null };

type PlayerCtxType = { state: State; dispatch: React.Dispatch<Action> };

const PlayerContext = createContext<PlayerCtxType>({} as PlayerCtxType);

const initialState: State = {
  isViewing: false,
  playing: null,
  playInfo: null,
  ctx: null,
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
  return { play };
};

const PlayerUI = () => {
  const { state, dispatch } = useContext(PlayerContext);
  const { isViewing, playInfo, ctx } = state;
  const { trackName } = playInfo as PlayInfo;
};

export const DlPlayer = () => {
  const { state, dispatch } = useContext(PlayerContext);
  const { isViewing, playInfo } = state;
  const [ctx, setCtx] = useState<AudioContext | null>(null);
  const display = isViewing ? "flex" : "none";

  const playProcess = async () => {
    console.log("process");
    if (playInfo) {
      const { targetUrl } = playInfo;
      console.log("playInfo");
      const $data = fromFetch(targetUrl, {
        selector(res) {
          return res.arrayBuffer();
        },
      });
      let buffer: ArrayBuffer = new ArrayBuffer(0);
      $data.subscribe({
        next: (result) => {
          buffer = _appendBuffer(buffer, result);
        },
        complete: async () => {
          if (ctx) {
            console.log("ctx");
            const src = ctx.createBufferSource();
            src.buffer = await ctx.decodeAudioData(buffer);
            src.connect(ctx.destination);
            src.start();
          }
        },
      });
    }
  };

  useEffect(() => {
    const cleanCtx = async () => {
      if (ctx) {
        await ctx.close();
        setCtx(null);
      }
      setCtx(new AudioContext());
    };
    cleanCtx();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playInfo]);

  useEffect(() => {
    if (ctx) playProcess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx]);

  const pause = async () => {
    ctx?.suspend();
  };

  const play = async () => {
    ctx?.resume();
  };

  return (
    <div
      id="react-use-player"
      style={{ display, bottom: 0, width: "100%", position: "fixed", backgroundColor: "white", left: 0, zIndex: 2000, padding: 10 }}
    >
      <button onClick={play}>play</button>
      <button>stop</button>
      <button onClick={pause}>pause</button>
      {playInfo?.trackName || ""}
    </div>
  );
};
