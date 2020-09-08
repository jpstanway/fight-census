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

export type Stats = {
  name: string;
  stats: Stat[];
};

// Fight Cards
export type Card = {
  id: number;
  title: string;
  date: string;
  city: string;
  country: string;
  link: string;
};

export type Fight = {
  id: number;
  division: string;
  fighters: string[];
  outcome?: string[];
  error?: string;
};
