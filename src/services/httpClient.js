import axios from 'axios';
import store from '../store';
const axiosInstance = axios.create();
/**
 *
 */

axiosInstance.interceptors.request.use(
    config => {
        if(!config.url.includes('loadDataFromQuery') && !config.url.includes('getSupplierByCode') && !config.url.includes('SearchMenu')){
            store.commit('loader',true);
        }
        
        return config;
    },
    error => {
        //  eslint-disable-line
        // TODO: Do something with request error
        store.commit('loader',false);
        return Promise.reject(error);
    }
);

/**
 *
 */
axiosInstance.interceptors.response.use(
    response => {
        //  eslint-disable-line
        // TODO: Do something before request is sent
        store.commit('loader',false);
        return response;
    },
    error => {
        //  eslint-disable-line
        // TODO: Do something with request error
        store.commit('loader',false);
        return Promise.reject(error);
    }
);

const fetchRequester = async ({ method, url, data }) => {
    console.log('method:', method)
    console.log('url:', url)
    console.log('data:', data)
    const response = await axiosInstance.request({
        url,
        method,
        data,
        headers: {
            Accept: "application/pdf",
            "Content-Type": "application/json",
            'dbname': localStorage.getItem('dataBaseName') || '',
            'dbusername':localStorage.getItem('dbusername') || '',
            'dbpassword':localStorage.getItem('dbpassword') || '',
            'dbserver':localStorage.getItem('dbserver') || ''
        }
    });
    return response;
};

export default fetchRequester;