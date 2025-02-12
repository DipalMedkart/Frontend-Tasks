import { call, put, takeEvery } from "redux-saga/effects";
import { SUBMIT_FORM_SUCCESS, SUBMIT_FORM_FAILURE, SUBMIT_FORM_REQUEST,FETCH_PRODUCT_DETAILS_REQUEST } from "../constant";
import { submitFormSuccess, submitFormFailure, setFormData, fetchProductDetailsSuccess, fetchProductDetailsFailure } from "../actions/formAction";
import axiosInstance from "@/utils/axioseInstance";
import { BASIC_URL } from "../constant";
import { toast } from "react-toastify";

function* AddProduct(action) {
    try {
        console.log("add product saga action " + action.payload);

        let formData = { ...action.payload };


        const booleanFields = ["is_active",
            "is_assured",
            "is_banned",
            "is_chronic",
            "is_discontinued",
            "is_hidden_from_alternate_products",
            "is_refrigerated",
            "is_rx_required",
            "can_sell_online"];


        booleanFields.forEach((key) => {
            if (typeof formData[key] === "string") {
                formData[key] = formData[key] === "Yes";
            }
        });


        const optimizedFormData = {
            product_name: action.payload.product_name,
            product_type: action.payload.product_type,
            mrp: Number(action.payload.mrp) || 0,
            can_sell_online: true,
            is_active: formData.is_active,
            is_assured: formData.is_assured,
            is_banned: formData.is_banned,
            is_chronic: formData.is_chronic,
            is_discontinued: formData.is_discontinued,
            is_hidden_from_alternate_products: formData.is_hidden_from_alternate_products,
            is_refrigerated: formData.is_refrigerated,
            is_rx_required: formData.is_rx_required,

            packaging_units: {
                dosage_form: action.payload.dosage_form || "",
                package_type: action.payload.package_type || "",
                uom: action.payload.uom || "",
                package_size: action.payload.package_size || "",
            },

            combination: {
                molecules: action.payload.molecules ? [action.payload.molecules.id] : [],
            },

            manufacturer: { 
                id: action.payload.manufacturers?.id || "", 
                name: action.payload.manufacturers?.name || "" 
            },

            transaction_units: {
                sales_unit: (action.payload.sales_unit) || "",
                purchase_unit:(action.payload.purchase_unit) || "",
                transfer_unit:(action.payload.transfer_unit) || "",
            },

            taxes: {
                hsn_code: (action.payload.hsn_code) || 0,
                gst_type: action.payload.gst_type || "", 
            },

            sales_category: {
                b2b_category: action.payload.b2b_category || "",
                b2c_category: action.payload["b2c-template"]?.id || "",
                sales_trend_category: action.payload.sales_trend_category || "",
                return_type: action.payload.product_return_type || "",
                // b2c_in: 0,
                // b2c_out: 120,
                // franchise_in: 180,
                // franchise_out: 210,
                // purchase: 180,
                // purchase_return: 90,
                scheduled_type_code: "Schedule",
            },

            mis_reporting_category: action.payload.mis_reporting_category || "",
            mis_warehouse_category: action.payload.mis_warehouse_category || "",
        };

        // Remove unnecessary fields
        const { ws_code, product_code, manufacturers, molecules, ...filteredFormData } = formData;

        console.log("Final Payload: ", filteredFormData);
        console.log("Final Payload: ", optimizedFormData);


        const response = yield call(axiosInstance.post, `${BASIC_URL}/master/products`, optimizedFormData);
        if(response.code === 200){
            toast.success("Product added successfully");
        }
        yield put(submitFormSuccess(response.data));

    } catch (error) {
        yield put(submitFormFailure(error.message));
        console.log(error.response?.data || error.message);
    }
}

function* fetchProductDetails(action){
    try {
        const productCode = action.payload;
        const response = yield call(axiosInstance.get,`${BASIC_URL}/master/products/unpublished/${productCode}`);
        yield put(fetchProductDetailsSuccess(response.data.product)); 
    } catch (error) {
        yield put(fetchProductDetailsFailure(error.message))
    }
}

export function* watchAddProduct() {
    yield takeEvery(SUBMIT_FORM_REQUEST, AddProduct);
    yield takeEvery(FETCH_PRODUCT_DETAILS_REQUEST, fetchProductDetails);
}