import axios from "axios";
import { Response, Mypage } from "./protocols";

const baseUrl = "http://localhost:8000/";


export const loginApi = async (email: string, password: string) => {
    const req = {
        "email": email,
        "password": password,
    }
    const promiseRes = await axios.post(baseUrl + "login/", req);
    const res: Response<null> = promiseRes.data[0];

    if (res.status) {
        localStorage.setItem("token", res.token);
    }
    return res.status;
}


export const isUniqueApi = async (column: string, val: string) => {
    const req = {
        "column": column,
        "val": val,
    }
    const promiseRes = await axios.post(baseUrl + "is_unique/", req);
    const boolUnique: boolean = promiseRes.data[0].status;

    return boolUnique;
}


export const signupApi = async (email: string, password: string, username: string) => {
    const req = {
        email: email,
        password: password,
        username: username,
    }
    const promiseRes = await axios.post(baseUrl + "signup/", req);
    const res: Response<null> = promiseRes.data[0];

    if (res.status) {
        localStorage.setItem("token", res.token);
    }
    return res.status;
}


export const getMypageLoginApi = async () => {
    const req = {
        token: localStorage.getItem("token")
    }
    const promiseRes = await axios.post(baseUrl + "mypage_login/", req);
    const res: Response<Mypage> = promiseRes.data[0];

    if (res.status) {
        localStorage.setItem("token", res.token);
    }
    return res;
}


export const updateUserInfoApi = async (column: string, val: string) => {
    const req = {
        token: localStorage.getItem("token"),
        column: column,
        val: val,
    }
    const promiseRes = await axios.put(baseUrl + "mypage_login/update_user_info/", req);
    const res: Response<null> = promiseRes.data[0];

    if (res.status) {
        localStorage.setItem("token", res.token);
    }
    return res;
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

export const putApi = async (name: string) => {
    const req = { name: "FOO" };
    const res = await axios.put(baseUrl + "mypage_login/1/", req);
    return res.data[0];
}