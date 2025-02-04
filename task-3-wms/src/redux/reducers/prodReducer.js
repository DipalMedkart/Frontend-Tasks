import { FastForward } from "lucide-react";
import { FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, SET_FILTER_OPTION, SET_SEARCH_OPTION, SET_SEARCH_TERM, SET_SORT_OPTION, SET_CURRENT_PAGE } from "../constant";

const initialState = {
    products: [],
    totalPages: 0,
    loading: false,
    error: null,
    searchTerm: '',
    searchOption: '',   
    filterOptions: Array(5).fill(''),
    sortOption: '',
    currentPage : 1,

}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return { ...state, loading: true, error: null }

        case FETCH_PRODUCTS_SUCCESS:
            return { ...state, loading: false, products: action.payload.products, totalPages: action.payload.totalPages }

        case FETCH_PRODUCTS_FAILURE:
            return { ...state, error: action.payload, loading: false }
        case SET_SEARCH_TERM:
            return { ...state, searchTerm: action.payload }
        case SET_SEARCH_OPTION:
            return { ...state, searchOption: action.payload }
        case SET_FILTER_OPTION:
            return { ...state, filterOption: action.payload }
        case SET_SORT_OPTION:
            return { ...state, sortOption: action.payload }
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.payload }
        default:
            return state
    }
}