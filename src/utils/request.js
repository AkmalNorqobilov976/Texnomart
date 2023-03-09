import axios from "axios";
import nProgress from "nprogress";
import { toast } from "vue3-toastify";
import { getToken } from "./storage";
const request = axios.create({
    baseURL: `https://dummyjson.com/`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
    }  
});

request.interceptors.request.use(request => {
    nProgress.start();
    return request;
})

request.interceptors.response.use(response => {
    nProgress.done();
    return response;
}, error => {
    nProgress.done();
    toast.error(error?.response?.data.message || error.message || 'Something went wrong!');
})

export default request;