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

export type Card = {
  id: number;
  date: string;
  event: string;
  location: string;
};

export type Cards = {
  timeline: string;
  cards: Card[];
};

export type Event = {
  id: number;
  event: string;
  date: string;
  city: string;
  country: string;
  link: string;
};
