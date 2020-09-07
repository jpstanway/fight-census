import { AnyAction } from "redux";
import { cardActionTypes, Cards } from "./actions";

const initialState = {
  upcoming: [],
  past: [],
};

const reducer = (state: Cards = initialState, action: AnyAction) => {
  switch (action.type) {
    case cardActionTypes.INITIALIZE_CARDS:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
