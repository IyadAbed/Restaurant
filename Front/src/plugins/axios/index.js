import axios from "axios";

const AxiosPlugin = axios.create({
  baseURL: "http://localhost:5500/",
});

export default AxiosPlugin;
