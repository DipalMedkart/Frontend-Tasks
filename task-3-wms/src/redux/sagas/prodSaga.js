import axios from "axios"
import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchProductError, fetchProductSuccess } from "../actions/prodAction";
import { FETCH_PRODUCTS_REQUEST, BASIC_URL } from "../constant";
import { useSelector } from "react-redux";

function* fetchProducts(action) {
    console.log(action);
    const token = action.payload.token
    
    console.log(token);
    try {
        console.log(token);
        const headers = {
            Authorization: `Bearer ${action.payload.token}`,
            
        }
        const { sortOption, page,sortOrder, filterOptions, searchQuery, searchOption, searchTerm} = action.payload; 
        console.log("search query " + searchQuery);
        console.log("search term " + searchTerm);

        const params = new URLSearchParams();

        if (sortOption){
            params.append('sort_by', `${sortOption},${sortOrder}`);
        }
        if (page) {
            params.append('page', page);
        }
        // if (filterBy) {
        //     params.append('filter_by', filterBy);
        // }
        if (searchQuery) {
            params.append('search', `${searchQuery},${searchOption}`);
        }
        if (filterOptions.is_assured) {
            params.append('is_assured', filterOptions.is_assured);
        }
        if (filterOptions.is_refrigerated) {
            params.append('is_refrigerated', filterOptions.is_refrigerated);
        }
        if (filterOptions.publish_status) {
            params.append('publish_status', filterOptions.publish_status);
        }
        if (filterOptions.manufacturer) {
            params.append('manufacturer', filterOptions.manufacturer);
        }
        if (filterOptions.combination) {
            params.append('combination', filterOptions.combination);
        }


        const response = yield call(axios.get, `${BASIC_URL}/master/products/unpublished?${params.toString()}`, {
          
            headers
          
        })
        // const response = yield call(axios.get, 'https://i-stage.mkwms.dev/api/v1/master/products/unpublished?sort_by=created,d&page=1', {
        //     headers
        // })
        console.log(response.data);
        yield put(fetchProductSuccess(response.data.products, response.data.meta.last_page))
    } catch (err) {
        console.log(err);
        yield put(fetchProductError(err.message))
    }

}

export function* watchFetchProducts() {
    yield takeEvery(FETCH_PRODUCTS_REQUEST, fetchProducts)
}