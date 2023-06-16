import axios from "axios";

const api = axios.create({
  baseURL: "http://school.test/api/",
  headers: { Authorization: `Bearer ${sessionStorage.getItem("@App:token")}` },
});

export default api;
