import { Dispatch } from "redux";
import { AppThunk } from "../../types/types";
import { getFights } from "./helpers";

export const fightActionTypes = {
  INITIALIZE_FIGHTS: "INITIALIZE_FIGHTS",
};

export const initializeFights = (card: string): AppThunk => async (
  dispatch: Dispatch
) => {
  const fights = await getFights(card);
  return dispatch({
    type: fightActionTypes.INITIALIZE_FIGHTS,
    payload: fights,
  });
};
