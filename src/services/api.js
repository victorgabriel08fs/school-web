import axios from 'axios';
const api = axios.create({
    baseURL: "http://191.53.88.86:1082/school/public/api/"
});

export default api;