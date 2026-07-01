import axios from "axios";

const API_URL = "http://localhost:5000/api/objave";

export const getObjave = () => {
    return axios.get(API_URL);
};

export const getJednaObjava = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const dodajObjavu = (formData, token) => {
    return axios.post(API_URL, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    });
};