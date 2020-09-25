import { Dispatch } from "redux";
import { AppThunk } from "../../types/types";
import { Fight } from "../../types/types";

export const fightActionTypes = {
  INITIALIZE_FIGHTS: "INITIALIZE_FIGHTS",
};

export const initializeFights = (fights: Fight[]): AppThunk => async (
  dispatch: Dispatch
) => {
  return dispatch({
    type: fightActionTypes.INITIALIZE_FIGHTS,
    payload: fights,
  });
};
