import { createStore, applyMiddleware, Middleware } from "redux";
import { createWrapper, MakeStore } from "next-redux-wrapper";
import { persistStore, persistReducer } from "redux-persist";
import { Card, Fight } from "../types/types";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

export interface RootState {
  cards: {
    upcoming: Card[];
    past: Card[];
  };
  fights: Fight[];
}

// Middleware
const bindMiddleware = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }

  return applyMiddleware(...middleware);
};

// Create Store
const makeStore: MakeStore = () => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    // create store server side
    return createStore(rootReducer, bindMiddleware([thunk]));
  } else {
    // create store client side to persist
    const storage = require("redux-persist/lib/storage").default;

    const persistConfig = {
      key: "nextjs",
      storage,
      whitelist: ["cards"],
    };

    // create new reducer with existing reducer
    const persistedReducer = persistReducer(persistConfig, rootReducer);

    const store = createStore(persistedReducer, bindMiddleware([thunk]));

    store.__persistor = persistStore(store);
    return store;
  }
};

export const wrapper = createWrapper(makeStore);
