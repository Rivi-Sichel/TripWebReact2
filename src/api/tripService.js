import axios from "axios";

const baseUrl = "https://tripwebnode.onrender.com/trip";


export const getAll = (pageNum) => {
    return axios.get(`${baseUrl}/?limit=5&page=${pageNum}`)
}

export const getById = (id) => {
    return axios.get(`${baseUrl}/${id}`);
}

export const update = (trip, token) => {    
    console.log("Token in update:", token); 
    return axios.put(`${baseUrl}/${trip._id}`, trip, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};


export const addTripServer = (trip, token) => {
    return axios.post(`${baseUrl}`, trip, {
        headers: {
            Authorization: `Bearer ${token}`,
           
        }
    });
};
export const getTotalPages = () => {
    return axios.get(`${baseUrl}/totalPages/?limit=5`);
}

export const deleteById = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}
export const deleteTrip = (id,token) => {
    return axios.delete(`${baseUrl}/${id}`, {
        headers: {
            authorization: `Bearer ${token}`, 
        }
    });
}











