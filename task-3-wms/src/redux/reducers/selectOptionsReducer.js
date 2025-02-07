import { FETCH_SELECT_OPTIONS_FAILURE, FETCH_SELECT_OPTIONS_SUCCESS, FETCH_SELECT_OPTIONS_REQUEST   } from "../constant";

const initialState = {
    selectOptions : {},
    loading: false,
    error: null,
}

export const selectOptionsReducer = (state = initialState, action) =>{

    switch(action.type){
        case FETCH_SELECT_OPTIONS_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_SELECT_OPTIONS_SUCCESS:
            return {...state, selectOptions: action.payload, loading: false, error: null};
        case FETCH_SELECT_OPTIONS_FAILURE:
            return {...state, loading: false, error: action.payload};
        default : 
            return state;

    }

}