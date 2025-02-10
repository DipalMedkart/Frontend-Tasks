import { FETCH_FILTER_OPTIONS_FAILURE, FETCH_FILTER_OPTIONS_SUCCESS, FETCH_FILTER_OPTIONS_REQUEST, UPDATE_FILTER, RESET_FILTER , UPDATE_SEARCH_QUERY} from "../constant";

// export const fetchFilterOptionsRequest = (filterType, searchQueries) => {
//     return {
//         type: FETCH_FILTER_OPTIONS_REQUEST,
//         payload: { filterType, searchQueries },
//     }
// }

// export const fetchFilterOptionsRequest = (filterType, searchQueries, isSelection = false) => {
//     const searchParam = `search=${searchQueries}`;
//     const statusParam = isSelection ? "&status=Active" : "";
    
//     return {
//         type: FETCH_FILTER_OPTIONS_REQUEST,
//         payload: { filterType, query: `${searchParam}${statusParam}` },
//     };
// };

export const fetchFilterOptionsRequest = (filterType, searchQueries, isSelection = false) => {
    return {
        type: FETCH_FILTER_OPTIONS_REQUEST,
        payload: {
            filterType,       
            searchQueries,      
            isSelection,      
        },
    };
};



export const  fetchFilterOptionsSuccess = (filterOptions) => {
    return {
        type : FETCH_FILTER_OPTIONS_SUCCESS,
        payload : filterOptions,
    }
}

export const fetchFilterOptionsFailure = (error) => {
    return {
        type: FETCH_FILTER_OPTIONS_FAILURE,
        payload: error,
    }
}

export const updateFilterOptions = (options) => {
    return {
        type: UPDATE_FILTER,
        payload: options
    }
}

export const  resetFilter = () => { 
    return {
        type: RESET_FILTER
    }
}

export const updateSearchQuery = (filterName, query) => ({
    type: UPDATE_SEARCH_QUERY,
    payload: { filterName, query },
});