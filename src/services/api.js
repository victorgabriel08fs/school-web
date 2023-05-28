import axios from 'axios';
const url = "http://school.test/api/";
const api = axios.create({
    baseURL: url ?? "http://191.53.88.86:1082/school/public/api/"
});

export default api;