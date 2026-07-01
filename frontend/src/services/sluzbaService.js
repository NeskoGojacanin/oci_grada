import axios from "axios";

const API_URL = "http://localhost:5000/api/sluzbe";

export const getSluzbe = () => {
    return axios.get(API_URL);
};