export type Fighter = {
  id: number;
  rank: number;
  name: string;
  wins: number;
  losses: number;
  country: string;
};

export type Division = {
  division: string;
  rankings: Fighter[];
};

export type Stat = {
  id: number;
  stat: string;
};
