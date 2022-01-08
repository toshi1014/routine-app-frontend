import React from 'react';
import {
    signupApi,
    deleteUsersApi,
    postOrDraftApi,
    getTestApi,
} from "../api_handlers/handle";
import { decodeJwt } from "../utils/utils";


const token = localStorage.getItem("token")
const boolLoginStatus = (token === null) ? false : true;

function Debug() {
    const showToken = () => {
        const token = localStorage.getItem("token")
        if (token) {
            console.log(decodeJwt(token));
        } else {
            console.log("no token found");
        }
    }

    const addUsers = async () => {
        const userList = [
            {
                email: "Alice@",
                password: "pw",
                username: "Alice",
            },
            {
                email: "Bob@",
                password: "pw",
                username: "Bob",
            },
        ];

        for (let user of userList) {
            const res = await signupApi(user.email, user.password, user.username);
            if (res) {
                console.log(user.username + " added successfully");
            } else {
                console.log(user.username + " already created");
            }
        }
    }

    const deleteUsers = async () => {
        const res = await deleteUsersApi();
        if (res) {
            console.log("deleted successfully");
        } else {
            console.log("ERR in deleteUsers");
        }
    }

    const newPost = async () => {
        const d = new Date();

        postOrDraftApi(
            "post",
            null,
            false,
            "POST_TITLE_" + String(d.getTime()).substring(8),
            "POST_DESC_" + String(d.getTime()).substring(8),
            ["HASH1,HASH2"],
            [
                {
                    title: "Go to fishing shops",
                    subtitle: "Why not?",
                    desc: "Firstly, Heat oil in a (14- to 16-inch)",
                    imagePath: "logo192.png",
                },
                {
                    title: "Buy goods",
                    subtitle: "e.g. hooks, rots",
                    desc: "I recommend you to ...",
                    imagePath: "logo192.png",
                },
            ]
        );
    }

    const newDraft = async () => {
        const d = new Date();

        postOrDraftApi(
            "draft",
            null,
            false,
            "DRAFT_TITLE_" + String(d.getTime()).substring(8),
            "DRAFT_DESC_" + String(d.getTime()).substring(8),
            ["HASH1, HASH2"],
            [
                {
                    title: "Go to fishing shops",
                    subtitle: "Why not?",
                    desc: "Firstly, Heat oil in a (14- to 16-inch)",
                    imagePath: "logo192.png",
                },
                {
                    title: "Buy goods",
                    subtitle: "e.g. hooks, rots",
                    desc: "I recommend you to ...",
                    imagePath: "logo192.png",
                },
            ]
        );
    }

    const getTest = async () => {
        const res = await getTestApi();
        console.log(res);
    }

    return (
        <div>
            <h1>Debug</h1>
            <div><button onClick={showToken}>SHOW_TOKEN</button></div>
            <div><button onClick={addUsers}>ADD_USERS</button></div>
            <div><button onClick={deleteUsers}>DELETE_USERS</button></div>
            <div><button onClick={getTest}>GET_TEST</button></div>
            {(
                boolLoginStatus
                    ? <div>
                        <button onClick={newPost}>NEW_POST</button>
                        <button onClick={newDraft}>NEW_DRAFT</button>
                    </div>
                    : <div />
            )}
        </div>
    );
}

export default Debug;