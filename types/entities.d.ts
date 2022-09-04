export type Track = {
  id: string;
  ownerId: string;
  title: string;
  fileMapId: number;
  isDisabled: boolean;
  playedCount: number;
  purchasedCount: number;
  thumbnailFileMapId: number;
  keyChord: string;
};

export type FileMap = {
  id: number;
  url: string;
  type: number;
  name: string;
  ownerId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type User = {
  email: string;
  password?: string;
  name: string;
  rank: number;
  uploadedTracks?: FileMap[];
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
