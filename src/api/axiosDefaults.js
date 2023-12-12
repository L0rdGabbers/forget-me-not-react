import axios from "axios";

axios.defaults.baseURL = "https://forget-me-not-api-2b7c6aaeb81b.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
