import axios from "axios"
import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchProductError, fetchProductSuccess } from "../actions/prodAction";
import { FETCH_PRODUCTS_REQUEST, BASIC_URL } from "../constant";
import { useSelector } from "react-redux";

function* fetchProducts(action) {
    try {
        const token = useSelector((state) => state.auth.token)
        const { sortby, page, filterBy, searchQuery } = action.payload;
        const response = yield call(axios.get, `${BASIC_URL}/master/products/unpublished`, {
            params: {
                sort_by: sortby,
                page: page,
                filter_by: filterBy,
                search: searchQuery
            }
        })

        yield put(fetchProductSuccess(response.data.products, response.data.meta.total))
    } catch (err) {
        yield put(fetchProductError(err.message))
    }

}

export function* watchFetchProducts() {
    yield takeEvery(FETCH_PRODUCTS_REQUEST, fetchProducts)
}