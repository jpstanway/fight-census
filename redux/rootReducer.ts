import { combineReducers } from "redux";
import cards from "./cards/reducer";
import fights from "./fights/reducer";

const rootReducer = combineReducers({
  cards,
  fights,
});

export default rootReducer;
