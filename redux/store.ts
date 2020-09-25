import { createStore, applyMiddleware, Middleware } from "redux";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

// Middleware
const bindMiddleware = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }

  return applyMiddleware(...middleware);
};

const initStore = () => createStore(rootReducer, bindMiddleware([thunk]));
export const wrapper = createWrapper(initStore);
