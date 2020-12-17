import axios from "axios";

//const baseURL = "https://catresc-api.herokuapp.com";
const baseURL = "http://192.168.0.124";

const api = axios.create({
	baseURL,

});

export default api;
