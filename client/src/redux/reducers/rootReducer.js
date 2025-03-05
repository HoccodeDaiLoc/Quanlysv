import { combineReducers } from "redux"; //kết hợp nhiều reducer thành 1 reducer

import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
