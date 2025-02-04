import { all } from "redux-saga/effects"
import { watchLogin } from "./sagas/loginSaga"
import { watchFetchProducts } from "./sagas/prodSaga";

export default function* rootSaga() {
    yield all([watchLogin(), watchFetchProducts()]);
}