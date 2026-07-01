import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const register = (korisnik) => {
    return axios.post(`${API_URL}/register`, korisnik);
};

export const login = (korisnik) => {
    return axios.post(`${API_URL}/login`, korisnik);
};

export const adminLogin = (admin) => {
    return axios.post(`${API_URL}/admin-login`, admin);
};