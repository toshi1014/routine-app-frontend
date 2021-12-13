import axios from "axios";
import { Response, Mypage } from "./protocols";

const baseUrl = "http://localhost:8000/";


export const loginApi = async (email: string, password: string) => {
    const req = {
        "email": email,
        "password": password,
    }
    const res = await axios.post(baseUrl + "login/", req);
    const data: Response<null> = res.data[0];

    if (data.status){
        localStorage.setItem("token", data.token);
    }
    return data.status;
}


export const isUniqueApi = async (column: string, val: string) => {
    const req = {
        "column": column,
        "val": val,
    }
    const res = await axios.post(baseUrl + "is_unique/", req);
    const boolUnique: boolean = res.data[0].status;

    return boolUnique;
}


export const signupApi = async (email: string, password: string, username: string) => {
    const req = {
        email: email,
        password: password,
        username: username,
    }
    const res = await axios.post(baseUrl + "signup/", req);
    const data: Response<null> = res.data[0];

    if (data.status){
        localStorage.setItem("token", data.token);
        console.log("token created");
    }
    return data.status;
}


export const getMypageLoginApi = async () => {
    const req = {
        token: localStorage.getItem("token") + "jfa"
    }
    console.log(req.token);
    const res = await axios.post(baseUrl + "mypage_login/", req);
    const data: Response<Mypage> = res.data[0];

    console.log("data:", data);

    if (data.status){
        localStorage.setItem("token", data.token);
        return data.contents;
    }else{
        console.log("else");
    }
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