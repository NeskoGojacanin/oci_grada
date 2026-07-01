import axios from "axios";

const API_URL = "http://localhost:5000/api/prijave";

export const dodajPrijavu = (id_objave, token) => {
    return axios.post(
        API_URL,
        { id_objave },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const mojePrijave = (token) => {
    return axios.get(`${API_URL}/moje`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const promijeniStatus = (id_prijave, podaci, token) => {
    return axios.put(`${API_URL}/${id_prijave}/status`, podaci, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};


export const svePrijave = (token) => {
    return axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};