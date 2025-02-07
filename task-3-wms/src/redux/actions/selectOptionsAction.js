import { FETCH_SELECT_OPTIONS_FAILURE, FETCH_SELECT_OPTIONS_SUCCESS, FETCH_SELECT_OPTIONS_REQUEST } from "../constant";

export const fetchSelectOptionsRequest = () => {
    return({
        type: FETCH_SELECT_OPTIONS_REQUEST

    })
}

export const fetchSelectOptionsSuccess = (data) => {
    return ({
        type : FETCH_SELECT_OPTIONS_SUCCESS,
        payload: data
    })
}

export const fetchSelectOptionsFailure = (error) => {
    return({
        type: FETCH_SELECT_OPTIONS_FAILURE,
        payload: error
    })
}