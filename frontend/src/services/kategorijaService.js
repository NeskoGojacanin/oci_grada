import axios from "axios";

const API_URL = "http://localhost:5000/api/kategorije";

export const getKategorije = () => {
    return axios.get(API_URL);
};