import axios from "axios";

const baseURL = "http://192.168.10.246/app";

const api = axios.create({
	baseURL,

});

export default api;
