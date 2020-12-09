import axios from "axios";

const baseURL = "http://192.168.0.124/app";

const api = axios.create({
	baseURL,

});

export default api;
