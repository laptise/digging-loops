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
  password: string;
  displayName: string;
  isAdmin: number;
};
