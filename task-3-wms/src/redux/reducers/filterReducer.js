import { FETCH_FILTER_OPTIONS_FAILURE, FETCH_FILTER_OPTIONS_SUCCESS, UPDATE_FILTER, RESET_FILTER, FETCH_FILTER_OPTIONS_REQUEST, UPDATE_SEARCH_QUERY } from "../constant";

const initialState = {
    filterOptions: {
        isAssured: ["Yes", "No"],
        isRegistered: ["Yes", "No"],
        status: ["Published", "Unpublished", "Draft"],
        manufacturers: [],
        molecules: [],

    },
    selectedFilters: {
        isAssured: "",
        isRegistered: "",
        status: "",
        manufacturers: "",
        molecules: "",

    },
    searchSelections: {
        b2cCategories: []
    },
    loading: false,
    error: null,
    searchQueries: { manufacturers: '', molecules: '', b2cCategories: '' },
}

export const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FILTER_OPTIONS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_FILTER_OPTIONS_SUCCESS:
            return {
                ...state, loading: false, error: null, filterOptions: { ...state.filterOptions, manufacturers: action.payload.manufacturers || [], molecules: action.payload.molecules || [] }, searchSelections: {
                    ...state.searchSelections,
                    b2cCategories: action.payload.b2cCategories || []  
                }
            };
        case FETCH_FILTER_OPTIONS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case RESET_FILTER:
            return {
                ...state,
                selectedFilters: {
                    isAssured: "",
                    isRegistered: "",
                    status: "",
                    manufacturers: "",
                    molecules: "",
                },
                searchSelections: {
                    b2cCategories: []
                }
            };
        case UPDATE_FILTER:
            return {
                ...state,
                selectedFilters: {
                    ...state.selectedFilters,
                    [action.payload.filterName]: action.payload.value
                }
            }
        case UPDATE_SEARCH_QUERY:
            return {
                ...state,
                searchQueries: {
                    ...state.searchQueries,
                    [action.payload.filterName]: action.payload.query,
                }
            }
        default:
            return state;
    }
}
