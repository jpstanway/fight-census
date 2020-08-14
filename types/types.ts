export type Fighter = {
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
