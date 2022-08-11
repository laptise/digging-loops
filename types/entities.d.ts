export type Track = {
  id: string;
  title: string;
  url: string;

  isDisabled: boolean;
  playedCount: number;
  purchasedCount: number;
};

export type User = {
  email: string;
  password?: string;
  name: string;
  rank: number;
};

export type Sample = {
  id: number;
  name: string;
  url: string;
  isDisabled: boolean;
  playedCount: number;
  purchasedCount: number;
};

export type TrackTagMap = {
  trackId: number;
  tagId: number;
};

export type Tag = {
  id: number;
  name: string;
};

export type TrackFeelingMap = {
  trackId: number;
  feelingId: number;
};

export type FeelingMst = {
  id: number;
  name: string;
};

export type TrackSoundMap = {
  trackId: number;
  soundId: number;
};

export type SoundMst = {
  id: number;
  name: string;
};

export type Dictionary = {
  id: number;
  kor: string;
  eng: string;
  jpn: string;
};
