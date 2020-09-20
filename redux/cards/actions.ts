import { Dispatch } from "redux";
import { Card, AppThunk } from "../../types/types";
import { getCards } from "./helpers";

export type Cards = {
  upcoming: Card[];
  past: Card[];
};

export const cardActionTypes = {
  INITIALIZE_CARDS: "INITIALIZE_CARDS",
};

export const initializeCards = (): AppThunk => async (dispatch: Dispatch) => {
  const cards = await getCards();
  return dispatch({
    type: cardActionTypes.INITIALIZE_CARDS,
    payload: cards,
  });
};
