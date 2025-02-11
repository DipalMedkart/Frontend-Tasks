
import { FETCH_PRODUCT_DETAILS_SUCCESS, FETCH_PRODUCT_DETAILS_FAILURE, FETCH_PRODUCT_DETAILS_REQUEST, UPDATE_PRODUCT_DETAILS_REQUEST, UPDATE_PRODUCT_DETAILS_FAILURE, UPDATE_PRODUCT_DETAILS_SUCCESS } from "../constant";



export const fetchProductDetailsRequest = (id) => ({
  type: FETCH_PRODUCT_DETAILS_REQUEST,
  payload: id,
});

export const fetchProductDetailsSuccess = (product) => ({
  type: FETCH_PRODUCT_DETAILS_SUCCESS,
  payload: product,
});

export const fetchProductDetailsFailure = (error) => ({
  type: FETCH_PRODUCT_DETAILS_FAILURE,
  payload: error,
});


export const updateProductDetailsRequest = (product) => ({
  type: UPDATE_PRODUCT_DETAILS_REQUEST,
  payload: product,
});

export const updateProductDetailsSuccess = (message) => ({
  type: UPDATE_PRODUCT_DETAILS_SUCCESS,
  payload: message,
});

export const updateProductDetailsFailure = (error) => ({
  type: UPDATE_PRODUCT_DETAILS_FAILURE,
  payload: error,
});
