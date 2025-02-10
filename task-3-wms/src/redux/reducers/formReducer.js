
import { UPDATE_FIELD, RESET_FORM, SUBMIT_FORM_SUCCESS, SUBMIT_FORM_FAILURE, SET_SELECTED_SECTION } from "../constant";

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

        case SUBMIT_FORM_FAILURE:
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

        default:
            return state;
    }
};


