import { Dispatch } from "redux";
import { Cards, AppThunk } from "../../types/types";

export const cardActionTypes = {
  INITIALIZE_CARDS: "INITIALIZE_CARDS",
};

export const initializeCards = (cards: Cards): AppThunk => async (
  dispatch: Dispatch
) => {
  return dispatch({
    type: cardActionTypes.INITIALIZE_CARDS,
    payload: cards,
  });
};
