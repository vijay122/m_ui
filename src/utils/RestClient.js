import axios from 'axios';

const client = (token = null) => {
    const defaultOptions = {
        headers: {
            Authorization: token ? `Token ${token}` : '',
        },
    };
        get = (url, options = {}) => axios.get(url, { ...defaultOptions, ...options }),
        post= (url, data, options = {}) => axios.post(url, data, { ...defaultOptions, ...options }),
        put= (url, data, options = {}) => axios.put(url, data, { ...defaultOptions, ...options }),
        del = (url, options = {}) => axios.delete(url, { ...defaultOptions, ...options })
};

module.exports = client;