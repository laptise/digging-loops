import { Tag } from "@entities";

export type AddNewTrackPayload = {
  title: string;
  trackName: string;
  keyChord: string;
  thumbnailName: string;
};

export type SearchTrackPayload = {
  ownerId?: string;
  type: number;
};

export type TrackUpdatePayload = {
  id: number;
  tags?: Tag[];
  title?: string;
};
