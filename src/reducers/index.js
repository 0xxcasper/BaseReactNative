import { combineReducers } from "redux";
import info from "./info";
import pricing from "./pricing";
import home from "./home";
import car from "./car";
import promotionReducer from "./promotionReducer";

const reducer = combineReducers({
  info: info,
  pricing: pricing,
  home: home,
  car: car,
});

export default reducer;
