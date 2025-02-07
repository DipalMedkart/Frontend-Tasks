import { loginReducer } from "./reducers/authReducer";
import { combineReducers } from "@reduxjs/toolkit";
import { productReducer } from "./reducers/prodReducer";
import { filterReducer } from "./reducers/filterReducer";
import { selectOptionsReducer } from "./reducers/selectOptionsReducer";
import { formReducer } from "./reducers/formReducer";

const rootReducer = combineReducers({
    auth : loginReducer,
    prod : productReducer,
    filter : filterReducer,
    selectOptions : selectOptionsReducer,
    form : formReducer
})

export default rootReducer;
