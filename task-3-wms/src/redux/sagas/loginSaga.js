import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS,MAC_ADDRESS,BASIC_URL } from "../constant";
import { put, call, takeEvery } from "redux-saga/effects"
import axios from "axios";
import dotenv from "dotenv";
// dotenv.config();
function* loginSaga(action) {
    try {
        const { email, password } = action.payload;

        const headers = {
            'Macaddress': MAC_ADDRESS,
            "Location" : 1,
        }
        // const response = yield call(axios.post, `https://stage.mkwms.dev/login?mac_address=${MAC_ADDRESS}`, { email, password }, { headers });
        const response = yield call(axios.post, `${BASIC_URL}/login`, { email, password }, { headers });
        
        if(response.data.code === 200){
            const token  = response.data.user.auth.token;
            console.log(response.data);
            yield put({ type: LOGIN_SUCCESS, payload: response.data });
            console.log(token);
        }else{
            yield put({type : LOGIN_FAILURE, payload : response.data.message})
        }

    } catch (error) {
        const errorMessage = error.response?.data?.message || "Login failed. Try again.";
        yield put({ type: LOGIN_FAILURE, payload: errorMessage });
    }
}

export function* watchLogin() {
    yield takeEvery(LOGIN_REQUEST, loginSaga);
}