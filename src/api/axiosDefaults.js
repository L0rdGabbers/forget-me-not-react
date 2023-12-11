import axios from "axios";

axios.defaults.baseURL =
  "https://forget-me-not-react-165c57a94df3.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;
