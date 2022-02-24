import reducer from "./reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    data: reducer
});

export default rootReducer;