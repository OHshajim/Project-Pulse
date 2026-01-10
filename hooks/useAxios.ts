import axios from "axios";

const API = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true,
});

export default API;
