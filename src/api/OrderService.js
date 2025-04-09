import axios from "axios";
import { jwtDecode } from "jwt-decode"; 


const baseUrl = "https://tripwebnode.onrender.com/orders";

export const saveOrderServer = (order) => {
    return axios.post(baseUrl, order);
}

export const getAllOrders = () =>{
    return axios.get(baseUrl);
}

export const getOrderById = (id) =>{
    return axios.get(`${baseUrl}/${id}`);
}

export const isTokenValid = (token) => {
    if (!token) return false;
    try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
    } catch (error) {
        console.error("Error decoding token:", error);
        return false;
    }
}