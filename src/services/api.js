import axios from 'axios';

const api = axios.create({
    baseURL: "http://187.44.62.184:1082/school/public/api/", headers: { 'Authorization': `Bearer ${sessionStorage.getItem('@App:token')}` }
});

export default api;