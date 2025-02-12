import { FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_REQUEST, SET_FILTER_OPTION, SET_SEARCH_OPTION, SET_SEARCH_TERM, SET_SORT_OPTION, SET_SORT_ORDER, SET_CURRENT_PAGE } from "../constant";

export const fetchProductRequest = (page, sortOption, sortOrder, filterOptions, searchTerm, searchOption, token) => {

    return ({
        type: FETCH_PRODUCTS_REQUEST,
        payload: { page, sortOption, sortOrder, filterOptions, searchTerm, searchOption, token },
    })

}

export const fetchProductSuccess = (products, totalPages) => {
    return ({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: { products, totalPages },
    })
}

export const fetchProductError = (error) => {
    return ({
        type: FETCH_PRODUCTS_FAILURE,
        payload: error,
    })
}

export const setSearchTerm = (term) => ({
    type: SET_SEARCH_TERM,
    payload: term,
});

export const setSearchOption = (option) => ({
    type: SET_SEARCH_OPTION,
    payload: option,
});

export const setFilterOptions = (filterKey, value) => ({
    type: SET_FILTER_OPTION,
    payload: { filterKey, value },
});

export const setSortOption = (option) => ({
    type: SET_SORT_OPTION,
    payload: option,
});

export const setCurrentPage = (page) => {
    return ({
        type: SET_CURRENT_PAGE,
        payload: page,
    })
}

export const setSortOrder = (order) => ({
    type: SET_SORT_ORDER,
    payload: order === "ascending" ? "a" : "d",
});