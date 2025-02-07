import axios from "axios";
import { FETCH_FILTER_OPTIONS_SUCCESS, FETCH_FILTER_OPTIONS_FAILURE, BASIC_URL, FETCH_FILTER_OPTIONS_REQUEST } from "../constant";
import { call, put, takeEvery } from 'redux-saga/effects'
import axiosInstance from "@/utils/axioseInstance";
import { useSelector } from "react-redux";



function* fetchFilterOptions(action) {
    // const token = useSelector((state) => state.auth.token);
    // console.log(token);

    const {searchQueries} = action.payload
    console.log(searchQueries);
    console.log(action);
    try {

        const params = new URLSearchParams()
        if(searchQueries){
            params.append("search", searchQueries);
        }
    
        const response = yield call(axiosInstance.get, `/master/${action.payload.filterType}?${params.toString()}${params ? ',name' : ''}`)
        yield put({ type: FETCH_FILTER_OPTIONS_SUCCESS, payload: response.data })
    } catch (error) {
        yield put({ type: FETCH_FILTER_OPTIONS_FAILURE, payload: error.message })
    }
}

export function* watchFetchFilterOptions() {
    yield takeEvery(FETCH_FILTER_OPTIONS_REQUEST, fetchFilterOptions)
}