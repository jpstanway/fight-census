import { combineReducers, AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import cards from "./cards/reducer";
import fights from "./fights/reducer";

const combinedReducers = combineReducers({
  cards,
  fights,
});

const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };

    return nextState;
  } else {
    return combinedReducers(state, action);
  }
};

export default reducer;
