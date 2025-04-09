import axios from "axios";

const baseUrl = "http://localhost:4000/user";

export const signupServer  = (user)=>{
    return axios.post(baseUrl+"/signup", user);
}

export const signInWithUserNameAndPasswordServer = (user) => {
    return axios.post(baseUrl + "/login", user);  // ודא שאתה שולח את הנתונים בצורה נכונה
};

export const getByNamePassword = (user) => {
    return axios.post(`${baseUrl}/getUser`, user);
};

