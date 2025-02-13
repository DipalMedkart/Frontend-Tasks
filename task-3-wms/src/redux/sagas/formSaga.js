import { call, put, takeEvery } from "redux-saga/effects";
import { SUBMIT_FORM_SUCCESS, SUBMIT_FORM_FAILURE, SUBMIT_FORM_REQUEST, FETCH_PRODUCT_DETAILS_REQUEST } from "../constant";
import { submitFormSuccess, submitFormFailure, setFormData, fetchProductDetailsSuccess, fetchProductDetailsFailure, resetForm } from "../actions/formAction";
import { UPDATE_PRODUCT_REQUEST } from "../constant";
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
                purchase_unit: (action.payload.purchase_unit) || "",
                transfer_unit: (action.payload.transfer_unit) || "",
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
        yield put(submitFormSuccess(response.data));
        if (response.code === 200) {
            toast.success("Product added successfully");
        }

    } catch (error) {
        yield put(submitFormFailure(error.message));
        console.log(error.response?.data || error.message);
    }
}

function* fetchProductDetails(action) {
    try {
        const productCode = action.payload;
        const response = yield call(axiosInstance.get, `${BASIC_URL}/master/products/unpublished/${productCode}`);
        yield put(fetchProductDetailsSuccess(response.data.product));
    } catch (error) {
        yield put(fetchProductDetailsFailure(error.message))
    }
}
function* updateProduct(action) {
    try {
        const { product_id, data } = action.payload;
        console.log("Edit form data");
        console.log(data);

        const optimizedEditFormData = {

            product_name: data.product_name,
            product_code: data.product_code,
            ws_code: data.ws_code,
            product_type: data.product_type,
            alternate_product_details: {
                id: data.alternate_product_details?.id || null,
                name: data.alternate_product_details?.name || "",
                draft_id: data.alternate_product_details?.draft_id || null,
            },
            can_sell_online: data.can_sell_online,
            combination: {
                molecules: data.combination?.molecules?.map((m) => m.molecule_id) || [],
            },
            is_active: data.is_active,
            is_assured: data.is_assured,
            is_banned: data.is_banned,
            is_chronic: data.is_chronic,
            is_discontinued: data.is_discontinued,
            is_hidden_from_alternate_products: false,
            is_refrigerated: data.is_refrigerated,
            is_rx_required: data.is_rx_required,
            last_sync_at: data.last_sync_at,
            // manufacturer: {
            //     id: data.manufacturer?.id,
            //     name: data.manufacturer?.name,
            // },
            manufacturer: {
                id: data.manufacturers?.id ?? data.manufacturer?.id,
                name: data.manufacturers?.name ?? data.manufacturer?.name,
            },
            
            mis_reporting_category: data.mis_reporting_category,
            mis_warehouse_category: data.mis_warehouse_category,
            mrp: data.mrp,
            packaging_units: {
                dosage_form: data.packaging_units?.dosage_form,
                package_type: data.packaging_units?.package_type,
                uom: data.packaging_units?.uom,
                package_size: data.packaging_units?.package_size,
                volume_metric: data.packaging_units?.volume_metric,
            },
            publish_status: data.publish_status,
            sales_category: {
                b2b_category: data.sales_category?.b2b_category,
                b2c_category: data.sales_category?.b2c_category?.id,
                sales_trend_category: data.sales_category?.sales_trend_category,
                is_returnable: data.sales_category?.is_returnable,
                b2c_in: 0,
                b2c_out: 120,
                franchise_in: 180,
                franchise_out: 210,
                purchase: 180,
                purchase_return: 90,
            },
            scheduled_type_code: data.scheduled_type_code,
            taxes: {
                hsn_code: data.taxes?.hsn_code,
                gst_type: data.taxes?.gst_type,
            },
            transaction_units: {
                sales_unit: data.transaction_units?.sales_unit,
                purchase_unit: data.transaction_units?.purchase_unit,
                transfer_unit: data.transaction_units?.transfer_unit,
            },
        };



        const response = yield call(axiosInstance.put, `${BASIC_URL}/master/products/${product_id}`, optimizedEditFormData);
        yield put({ type: "UPDATE_PRODUCT_SUCCESS", payload: response.data });
        if(response.code === 200){
            yield put(resetForm())
            toast.success("Product updated successfully!");
            
        }
    } catch (error) {
        yield put({ type: "UPDATE_PRODUCT_FAILURE", error });
        toast.error("Failed to update product.");
    }
}



export function* watchAddProduct() {
    yield takeEvery(SUBMIT_FORM_REQUEST, AddProduct);
    yield takeEvery(FETCH_PRODUCT_DETAILS_REQUEST, fetchProductDetails);
    yield takeEvery(UPDATE_PRODUCT_REQUEST, updateProduct);
}