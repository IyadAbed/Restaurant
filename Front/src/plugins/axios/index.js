import axios from "axios";

const AxiosPlugin = axios.create({
  baseURL: "http://localhost:5000",
});

export default AxiosPlugin;
