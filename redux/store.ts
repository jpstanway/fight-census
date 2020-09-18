import {
  createStore,
  applyMiddleware,
  combineReducers,
  Middleware,
  AnyAction,
} from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import cardsReducer from "./cards/reducer";
import fightsReducer from "./fights/reducer";

const bindMiddleware = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }

  return applyMiddleware(...middleware);
};

const combinedReducers = combineReducers({
  cardsReducer,
  fightsReducer,
});

const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };

    if (state.cards.upcoming && state.cards.upcoming.length > 0)
      nextState.cards.upcoming = state.cards.upcoming;
    if (state.cards.past && state.cards.past.length > 0)
      nextState.cards.past = state.cards.past;

    return nextState;
  } else {
    return combinedReducers(state, action);
  }
};

// initialState needs to be
const initStore = () => createStore(reducer, bindMiddleware([thunk]));

export const wrapper = createWrapper(initStore);
