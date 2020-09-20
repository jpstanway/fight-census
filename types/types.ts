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

// Fight Cards
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
