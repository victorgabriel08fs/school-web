import axios from 'axios';
const api = axios.create({
    baseURL: "http://school.test/api/"
});

export default api;