import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

export const dodajKategoriju = (kategorija, token) => {
    return axios.post(`${API_URL}/kategorije`, kategorija, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const dodajSluzbu = (sluzba, token) => {
    return axios.post(`${API_URL}/sluzbe`, sluzba, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const postaviKoordinatora = (id_korisnika, token) => {
    return axios.put(`${API_URL}/korisnici/${id_korisnika}/koordinator`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};