import axios from "axios";
import nProgress from "nprogress";
import { toast } from "vue3-toastify";
const request = axios.create({
    baseURL: `https://dummyjson.com/`,
    headers: {
        'Content-Type': 'application/json'
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
    toast.error(error.message || 'Something went wrong!');
})

export default request;