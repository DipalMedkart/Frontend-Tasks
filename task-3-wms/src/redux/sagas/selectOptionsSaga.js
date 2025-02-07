import {  BASIC_URL, FETCH_SELECT_OPTIONS_REQUEST } from "../constant";
import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { fetchSelectOptionsFailure, fetchSelectOptionsSuccess } from "../actions/selectOptionsAction";

import axiosInstance from "@/utils/axioseInstance";


function* fetchSelectOptions(){
    try{
        const response = yield call(axiosInstance.get, `${BASIC_URL}/master-data/productMasterData`)
        if(response.data.code === 200){
            yield put(fetchSelectOptionsSuccess(response.data.productMasterData))
        }else{
            yield put(fetchSelectOptionsFailure(response.data.message))
        }
    }catch(error){
        yield put(fetchSelectOptionsFailure(error.message))
    }
}

export function* watchFetchSelectOptions(){
    yield takeEvery(FETCH_SELECT_OPTIONS_REQUEST, fetchSelectOptions)
}