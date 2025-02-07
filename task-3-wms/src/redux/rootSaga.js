import { all } from "redux-saga/effects"
import { watchLogin } from "./sagas/loginSaga"
import { watchFetchProducts } from "./sagas/prodSaga";
import { watchFetchFilterOptions } from "./sagas/filterSaga";
import { watchFetchSelectOptions } from "./sagas/selectOptionsSaga";

export default function* rootSaga() {
    yield all([watchLogin(), watchFetchProducts(), watchFetchFilterOptions(), watchFetchSelectOptions()]);
}