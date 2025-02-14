
import { UPDATE_FIELD, RESET_FORM, SUBMIT_FORM, SUBMIT_FORM_SUCCESS, SUBMIT_FORM_FAILURE, SET_SELECTED_SECTION, SUBMIT_FORM_REQUEST, SET_FORM_DATA, FETCH_PRODUCT_DETAILS_FAILURE, FETCH_PRODUCT_DETAILS_SUCCESS, FETCH_PRODUCT_DETAILS_REQUEST, UPDATE_PRODUCT_REQUEST } from "../constant";

export const updateField = (name, value) => ({
    type: UPDATE_FIELD,
    payload: { name, value },
});

export const resetForm = () => ({
    type: RESET_FORM,
});

export const submitForm = () => ({
    type: SUBMIT_FORM,
});

export const submitFormRequest = (formData) => ({
    type: SUBMIT_FORM_REQUEST,
    payload: formData,
});

export const submitFormSuccess = (data) => ({
    type: SUBMIT_FORM_SUCCESS,
    payload: data,
});

export const submitFormFailure = (error) => ({
    type: SUBMIT_FORM_FAILURE,
    payload: error,
});

export const setSelectedSection = (sectionName) => ({
    type: SET_SELECTED_SECTION,
    payload: sectionName,
});

export const setFormData = (data) => ({
    type: SET_FORM_DATA,
    payload: data,
});

export const fetchProductDetailsRequest = (productCode) => ({
    type: FETCH_PRODUCT_DETAILS_REQUEST,
    payload: productCode,
});

export const fetchProductDetailsSuccess = (data) => ({
    type: FETCH_PRODUCT_DETAILS_SUCCESS,
    payload: data,
});

export const fetchProductDetailsFailure = (error) => ({
    type: FETCH_PRODUCT_DETAILS_FAILURE,
    payload: error,
});

export const updateProductRequest = ({product_id,data}) => ({
    type: UPDATE_PRODUCT_REQUEST,
    payload: {product_id,data},
});  