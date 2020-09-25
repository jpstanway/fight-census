import { combineReducers, AnyAction, Reducer } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import cards from "./cards/reducer";
import fights from "./fights/reducer";
import { Card, Fight } from "../types/types";

export interface RootState {
  cards: {
    upcoming: Card[];
    past: Card[];
  };
  fights: Fight[];
}

const combinedReducers = combineReducers({
  cards,
  fights,
});

const rootReducer: Reducer<RootState, AnyAction> = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };

    if (state?.cards.upcoming && state.cards.upcoming.length > 0)
      nextState.cards.upcoming = state.cards.upcoming;
    if (state?.cards.past && state.cards.past.length > 0)
      nextState.cards.past = state.cards.past;

    return nextState;
  } else {
    return combinedReducers(state, action);
  }
};

export default rootReducer;
