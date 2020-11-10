import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../redux/store";

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

// General
export type IterableObject = {
  [key: string]: string;
};

// Fight Cards
export type Cards = {
  upcoming: Card[];
  past: Card[];
};

export type Card = {
  id: number;
  title: string;
  date: string;
  venue: string;
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

// Thunks
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type Event = {
  id: number;
  title: string;
  link: string;
  date: string;
  venue: string;
  city: string;
  country: string;
};

export type Match = {
  id: number;
  division: string;
  red: string;
  redLink: string | undefined;
  redStats?: FighterStats;
  blue: string;
  blueLink: string | undefined;
  blueStats?: FighterStats;
  result: string;
  round: string;
  time: string;
};

export type FighterStats = {
  height: string;
  weight: string;
  division: string;
  reach: string;
};