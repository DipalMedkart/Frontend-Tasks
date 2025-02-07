
import { UPDATE_FIELD, RESET_FORM, SUBMIT_FORM, SUBMIT_FORM_SUCCESS, SUBMIT_FORM_FAILURE, SET_SELECTED_SECTION } from "../constant";

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