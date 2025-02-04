import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_REQUEST, LOGOUT_REQUEST } from "../constant";

const initialState = {
    user: null,
    token: null,
    error: null,
    loading: false,
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_SUCCESS:
            return { ...state, loading: false, token: action.payload.user.auth.token, user: action.payload.user.profile, error: null };
        case LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case LOGOUT_REQUEST: {
            return { ...initialState }
        }
        default:
            return state;
    }
}

