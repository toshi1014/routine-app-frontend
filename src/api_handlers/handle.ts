import axios from "axios";
import {
    Response,
    IsUnique,
    NewToken,
    Mypage,
    MypageLogin,
    SearchResults,
    UserList,
    DbTable,
    AdminUser,
    Post,
} from "./protocols";
import {
    RoutineElement,
    RoutineContents,
    AuthEmail,
} from "../utils/Types";
import { deleteImage } from "../firebase/handler";

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
    const res: Response<IsUnique> = promiseRes.data[0];

    if (res.status) {
        return res.contents.boolUnique;
    } else {
        console.log(res.errorMessage);
    }
}


export const signupApi = async (email: string, password: string, username: string) => {
    const req = {
        email: email,
        password: password,
        username: username,
    }
    const promiseRes = await axios.post(baseUrl + "signup/", req);
    const res: Response<NewToken> = promiseRes.data[0];

    if (res.status) {
        localStorage.setItem("token", res.contents.newToken);
    }
    return res.status;
}


export const getMypageLoginApi = async () => {
    const req = {
        token: localStorage.getItem("token")
    }
    const promiseRes = await axios.post(baseUrl + "mypage_login/", req);
    const res: Response<MypageLogin> = promiseRes.data[0];

    if (res.status) {
        localStorage.setItem("token", res.token);
    }
    return res;
}


export const getMypageApi = async (user_id: number) => {
    const promiseRes = await axios.get(baseUrl + "mypage/" + user_id + "/");
    const res: Response<Mypage> = promiseRes.data[0];
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


export const postOrDraftApi = async (
    strPostOrDraft: string,
    postId: number | null,
    boolEditedDraft: boolean,
    title: string,
    desc: string,
    hashtagLabelList: Array<string>,
    routineElements: Array<RoutineElement>,
) => {
    if (strPostOrDraft !== "post" && strPostOrDraft !== "draft") throw new Error("");

    const req = {
        token: localStorage.getItem("token"),
        postOrDraft: strPostOrDraft,
        postId: postId,
        boolEditedDraft: boolEditedDraft,
        title: title,
        desc: desc,
        hashtagLabelList: hashtagLabelList,
        routineElements: routineElements,
    }
    console.log("req:", req);
    const promiseRes = await axios.post(baseUrl + "post_or_draft/", req);
    const res: Response<Post> = promiseRes.data[0];

    if (res.status) {
        localStorage.setItem("token", res.token);
    }
    return res;
}


export const getContentsApi = async (id: number) => {
    const promiseRes = await axios.get(baseUrl + "contents/" + id + "/");
    const res: Response<RoutineContents> = promiseRes.data[0];
    return res;
}


export const getDraftApi = async (id: number) => {
    const req = {
        token: localStorage.getItem("token"),
        id: id,
    }
    const promiseRes = await axios.post(baseUrl + "mypage_login/get_draft/", req);
    const res: Response<RoutineContents> = promiseRes.data[0];

    if (res.status) {
        localStorage.setItem("token", res.token);
    }
    return res;
}


export const deleteApi = async (strPostOrDraft: string, id: number) => {
    const req = {
        token: localStorage.getItem("token"),
        postOrDraft: strPostOrDraft,
        id: id,
    }
    const promiseRes = await axios.post(baseUrl + "mypage_login/delete_post_or_draft/", req);
    const res: Response<null> = promiseRes.data[0];

    await deleteImage(`post-${id}`);
    for (let i = 0; i < 10; i++) {
        await deleteImage(`post-${id}-element-${i}`);
    }

    if (res.status) {
        localStorage.setItem("token", res.token);
    }

    return res;
}


export const searchApi = async (keyword: string, target: string, page?: number) => {
    if (!page) { page = 1; }
    console.log(`${baseUrl}search_results/${keyword}/${target}/${page}/`);
    const promiseRes = await axios.get(`${baseUrl}search_results/${keyword}/${target}/${page}/`);
    const res: Response<SearchResults> = promiseRes.data[0];
    return res;
}


export const followApi = async (targetUserId: number, boolUnfollow: boolean) => {
    const req = {
        token: localStorage.getItem("token"),
        targetUserId: targetUserId,
    }
    const followOrUnfollow = (boolUnfollow ? "unfollow" : "follow");
    console.log(followOrUnfollow);
    const promiseRes = await axios.post(baseUrl + "mypage_login/" + followOrUnfollow + "/", req);
    const res: Response<NewToken> = promiseRes.data[0];

    if (res.status) {
        localStorage.setItem("token", res.contents.newToken);
    }
    return res;
}


export const getFollowingOrFollowersApi = async (userId: number, followingOrFollowers: string) => {
    if (followingOrFollowers !== "following" && followingOrFollowers !== "followers") {
        throw new Error("unknown followingOrFollowers " + followingOrFollowers);
    }
    const promiseRes = await axios.get(`${baseUrl}mypage/get_following_or_followers/${userId}/${followingOrFollowers}/`);
    const res: Response<UserList> = promiseRes.data[0];
    return res;
}


export const likeApi = async (postId: number, boolUnlike: boolean) => {
    const req = {
        token: localStorage.getItem("token"),
        postId: postId,
    }

    const likeOrUnlike = (boolUnlike ? "unlike" : "like");
    const promiseRes = await axios.post(baseUrl + "mypage_login/" + likeOrUnlike + "/", req);
    const res: Response<NewToken> = promiseRes.data[0];

    if (res.status) {
        localStorage.setItem("token", res.contents.newToken);
    }
    return res;
}


export const favoriteApi = async (postId: number, boolUnfavorite: boolean) => {
    const req = {
        token: localStorage.getItem("token"),
        postId: postId,
    }

    const favoriteOrUnfavorite = (boolUnfavorite ? "unfavorite" : "favorite");
    const promiseRes = await axios.post(baseUrl + "mypage_login/" + favoriteOrUnfavorite + "/", req);
    const res: Response<NewToken> = promiseRes.data[0];

    if (res.status) {
        localStorage.setItem("token", res.contents.newToken);
    }
    return res;
}


export const sendEmailApi = async (arg: AuthEmail) => {
    const req = {
        recipient: arg.emailAddress,
        purpose: arg.purpose,
        context: arg.context,
    }
    const promiseRes = await axios.post(baseUrl + "send_email/", req);
    const res: Response<null> = promiseRes.data[0];
    return res;
}


export const reportApi = async (postId: number, reason: string, reportComment: string) => {
    const req = {
        postId: postId,
        reason: reason,
        reportComment: reportComment,
    }
    const promiseRes = await axios.post(baseUrl + "report/", req);
    const res: Response<null> = promiseRes.data[0];
    return res;
}


export const downloadDbApi = async (tableNameList: Array<string>) => {
    const req = {
        token: localStorage.getItem("token"),
        tableNameList: tableNameList,
    }
    const promiseRes = await axios.post(baseUrl + "download_db/", req);
    const res: Response<{ [table_name: string]: DbTable }> = promiseRes.data[0];
    return res;
}


export const isAdminUser = async () => {
    const req = {
        token: localStorage.getItem("token"),
    }
    const promiseRes = await axios.post(baseUrl + "is_admin_user/", req);
    const res: Response<AdminUser> = promiseRes.data[0];
    return res;
}


// DEBUG: below
export const deleteUsersApi = async () => {
    const promiseRes = await axios.get(baseUrl + "delete_users/");
    const res = promiseRes.data[0];
    return res.status;
}

export const getTestApi = async () => {
    const promiseRes = await axios.get(baseUrl + "debug/");
    const res = promiseRes.data[0];
    return res;
}