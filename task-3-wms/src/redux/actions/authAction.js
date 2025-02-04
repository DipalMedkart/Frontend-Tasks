import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST } from '../constant'

// export const loginRequest = (credentials) => ({
//     console.log(credentials);
//     type: LOGIN_REQUEST,
//     payload: credentials

// })

export const loginSuccess = (userDetails) => {
    return({

        type: LOGIN_SUCCESS,
        payload: userDetails,
    })
}


export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
})

export const loginRequest = (payload) =>
{
    console.log('payloaddd login request',payload)
    return{
        type: LOGIN_REQUEST,
        payload: payload
    }
        
    
}

export const logoutRequest = () => {
    return {
        type : LOGOUT_REQUEST
    }
}