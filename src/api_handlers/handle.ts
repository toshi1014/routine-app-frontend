import axios from "axios";
import { ResLogin } from "./protocols";

const baseUrl = "http://localhost:8000/";

export const loginApi = async (email: string, password: string) => {
    const req = {
        "email": email,
        "password": password,
    }
    const res = await axios.post(baseUrl + "login/", req);
    const data: ResLogin = res.data[0];

    if (data.status){
        localStorage.setItem("token", data.token);
    }
    return data.status;
}

export const getApi = async () => {
    try {
        const res = await axios.get(baseUrl + "post/");
        const data = res.data[0];
        console.log(data);
        if (data.status) {
            console.log(data.val);
        } else {
            console.log(data.reason);
        }
    } catch (err) {
        console.log(err);
    }
}


export const postApi = async (username: string) => {
    const res = await axios.post(
        baseUrl + "post/",
        {
            "username": username,
            "password": "8979",
            "token": localStorage.getItem("token")
        });

    const data = res.data[0];
    console.log(data);

    if (data.status) {
        console.log(data.val);
    } else {
        console.log(data.reason);
    }
}