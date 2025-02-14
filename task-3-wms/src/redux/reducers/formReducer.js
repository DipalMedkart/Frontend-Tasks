
import { UPDATE_FIELD, RESET_FORM, SUBMIT_FORM_SUCCESS, SUBMIT_FORM_FAILURE, SET_SELECTED_SECTION, SUBMIT_FORM_REQUEST, SET_FORM_DATA, FETCH_PRODUCT_DETAILS_FAILURE,SET_FORM_ERRORS, FETCH_PRODUCT_DETAILS_SUCCESS, FETCH_PRODUCT_DETAILS_REQUEST } from "../constant";

const initialState = {
    formData: {},
    selectedSection: 'packaging_units',
    loading: false,
    error: null,
};

export const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_FIELD:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.payload.name]: action.payload.value,
                },
            };

        case SUBMIT_FORM_REQUEST:
        case FETCH_PRODUCT_DETAILS_REQUEST:
            return {
                ...state, loading: true, error: null,
            }
        case RESET_FORM:
            return {
                ...state,
                formData: {},
                error: null,
            };

        case SUBMIT_FORM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                formData: {},
            };

        case SET_FORM_ERRORS:
            return{
                ...state,
                error : action.payload,
            }

        case SUBMIT_FORM_FAILURE:
        case FETCH_PRODUCT_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case SET_SELECTED_SECTION:
            return {
                ...state,
                selectedSection: action.payload
            }

        case SET_FORM_DATA:
            return {
                ...state,
                formData: action.payload,
            };

        case FETCH_PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                formData: action.payload,  
                error: null,
            };
        default:
            return state;
    }
};


