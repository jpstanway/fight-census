import { AnyAction } from "redux";
import { fightActionTypes } from "./actions";
import { Fight } from "../../types/types";

const reducer = (state: Fight[] = [], action: AnyAction) => {
  switch (action.type) {
    case fightActionTypes.INITIALIZE_FIGHTS:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
