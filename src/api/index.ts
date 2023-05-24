import axios from "axios";
import {ElMessage} from 'element-plus'

const service = axios.create({
    baseURL: "/utils",
    // baseURL: "/api",
    // url = base url + request url
    timeout: 20000, // request timeout
});

//响应拦截
service.interceptors.response.use(
    (response) => {
        let data = response.data;
        if (data.success) {
            return data;
        } else {
            ElMessage.error(data.message);
            return Promise.reject(data);
        }
    },
    (error) => {
        console.log(error)
        ElMessage.error(error.message);
        return Promise.reject(error);
    }
);


//请求拦截
service.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default service;

