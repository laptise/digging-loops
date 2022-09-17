import { fromFetch } from "rxjs/fetch";
import { PlayInfo } from "./types";

class NoAudioContextException {}
class NoArrayBufferException {}

export const _appendBuffer = function (buffer1: ArrayBuffer, buffer2: ArrayBuffer) {
  const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp.buffer;
};

function getBufferCollector() {
  let buffer: ArrayBuffer = new ArrayBuffer(0);
  return {
    getBuffer() {
      return buffer;
    },
    collectBuffer(input: ArrayBuffer) {
      buffer = _appendBuffer(buffer, input);
    },
  };
}

type PlayerProps = {
  onLoadStarted?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onResume?: () => void;
};

export class Player {
  private buffer?: ArrayBuffer;
  private audioBuffer?: AudioBuffer;
  private ctx?: AudioContext;
  private gainNode?: GainNode;
  private _volume: number = 1;
  constructor() {
    console.log("player init");
  }
  onLoadStarted() {}
  onPlay() {}
  onPause() {}
  onStop() {}
  onResume() {}

  public async setTrack(targetUrl: string) {
    this.onLoadStarted?.();
    await this.newContext();
    const buffer = await this.getBufferFromFetch(targetUrl);
    await this.prepareForPlay(buffer);
  }

  private async prepareForPlay(arrayBuffer: ArrayBuffer) {
    const ctx = this.getContext();
    const bufferNode = ctx.createBufferSource();
    bufferNode.buffer = await this.makeAudioBuffer(arrayBuffer);
    this.gainNode = ctx.createGain();
    this.gainNode.gain.value = this.volume;
    bufferNode.connect(this.gainNode);
    this.gainNode.connect(ctx.destination);
    bufferNode.start();
    ctx.suspend();
  }

  public async play() {
    this?.onPlay?.();
    const ctx = this.getContext();
    await ctx.resume();
  }

  public async pause() {
    this?.onPause?.();
    const ctx = this.getContext();
    await ctx.suspend();
  }

  public async resume() {}

  public async stop() {
    await this.newContext();
    const ctx = this.getContext();
    const bufferNode = ctx.createBufferSource();
    bufferNode.buffer = this!.audioBuffer!;
    bufferNode.connect(ctx.destination);
    bufferNode.start();
    ctx.suspend();
    this?.onStop?.();
  }

  private getAudioBuffer() {
    if (!this.buffer) {
      throw new NoArrayBufferException();
    } else {
      return this.buffer;
    }
  }

  private async makeAudioBuffer(buffer: ArrayBuffer) {
    const ctx = this.getContext();
    this.audioBuffer = await ctx.decodeAudioData(buffer);
    return this.audioBuffer;
  }

  private async getBufferFromFetch(targetUrl: string) {
    return await new Promise<ArrayBuffer>((resolve, reject) => {
      const $data = fromFetch(targetUrl, {
        selector(res) {
          return res.arrayBuffer();
        },
      });
      const { collectBuffer, getBuffer } = getBufferCollector();
      $data.subscribe({
        next: (result) => {
          collectBuffer(result);
        },
        complete: async () => {
          resolve(getBuffer());
        },
      });
    });
  }

  public set volume(v) {
    this._volume = v;
    if (this.gainNode) this.gainNode.gain.value = v;
  }
  public get volume() {
    return this._volume;
  }

  private getContext() {
    if (!this.ctx) {
      throw new NoAudioContextException();
    } else return this.ctx;
  }

  public async newContext() {
    await this.killCtx();
    this.ctx = new AudioContext();
    const srcNode = this.ctx.createBufferSource();
    const gainNode = this.ctx.createGain();
  }

  private async killCtx() {
    if (this.ctx) {
      await this.ctx.suspend();
      await this.ctx.close();
    }
  }
}
