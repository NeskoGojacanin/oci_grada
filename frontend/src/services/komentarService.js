import axios from "axios";

const API_URL = "http://localhost:5000/api/komentari";

export const getKomentariZaObjavu = (id_objave) => {
    return axios.get(`${API_URL}/objava/${id_objave}`);
};

export const dodajKomentar = (komentar, token) => {
    return axios.post(API_URL, komentar, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};