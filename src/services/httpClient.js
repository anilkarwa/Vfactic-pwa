import axios from 'axios';
const axiosInstance = axios.create();
/**
 *
 */
axiosInstance.interceptors.request.use(
    config => {
        //  eslint-disable-line
        // TODO: Do something before request is sent
        return config;
    },
    error => {
        //  eslint-disable-line
        // TODO: Do something with request error
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
        return response;
    },
    error => {
        //  eslint-disable-line
        // TODO: Do something with request error
        return Promise.reject(error);
    }
);

const fetchRequester = async ({ method, url, data }) => {
    const response = await axiosInstance.request({
        url,
        method,
        data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem('Token')
        }
    });
    return response;
};

export default fetchRequester;