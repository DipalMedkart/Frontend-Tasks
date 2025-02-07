import axios from "axios";
import {store} from "../redux/store"

const axiosInstance = axios.create({
    baseURL : 'https://i-stage.mkwms.dev/api/v1'
})

axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState()
        const token = state.auth.token;

        if(token){
            config.headers['Authorization'] = `Bearer ${token}`
        }

        return config;
    },
    (error) =>{
        return Promise.reject(error)
    }
)

export default axiosInstance;

    