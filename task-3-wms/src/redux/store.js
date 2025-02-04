import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import createSagaMiddleware from "redux-saga";


const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export default store;   