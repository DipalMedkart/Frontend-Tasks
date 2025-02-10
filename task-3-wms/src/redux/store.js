import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
    key : 'root',
    storage,
    whitelist : ['auth']
}


const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], 
        },
      }).concat(sagaMiddleware)
});
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export {store, persistor};   