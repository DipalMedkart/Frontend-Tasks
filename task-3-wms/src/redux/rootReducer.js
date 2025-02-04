import { loginReducer } from "./reducers/authReducer";
import { combineReducers } from "@reduxjs/toolkit";
import { productReducer } from "./reducers/prodReducer";

const rootReducer = combineReducers({
    auth : loginReducer,
    prod : productReducer,
})

export default rootReducer;
