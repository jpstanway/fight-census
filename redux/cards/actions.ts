import { Card } from "../../types/types";

export type Cards = {
  upcoming: Card[];
  past: Card[];
};

export const cardActionTypes = {
  INITIALIZE_CARDS: "INITIALIZE_CARDS",
};

export const initializeCards = (cards: Cards) => {
  return {
    type: cardActionTypes.INITIALIZE_CARDS,
    payload: cards,
  };
};