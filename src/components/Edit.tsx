import React from 'react';
import { useNavigate } from "react-router-dom";
import { getDraftApi } from "../api_handlers/handle";


function Edit() {
    const navigate = useNavigate();

    React.useEffect(() => {
        const init = async () => {
            const href = window.location.href;
            const splitHref = href.split('/');
            const splitHrefLength = splitHref.length;
            const postOrDraft = splitHref[splitHrefLength - 2];
            const id = Number(splitHref[splitHrefLength - 1]);

            const res = await getDraftApi(id);

            if (res.status) {
                console.log(res.contents);
            } else {
                console.log("is_authentication failed");

                // force logout & redirect to login
                localStorage.removeItem("token");
                navigate("/login");
                window.location.reload();
            }

            console.log(postOrDraft, id);
        }
        init();
    }, [])


    return (
        <div>
            <h1>Edit</h1>
            <img src={process.env.PUBLIC_URL + "/favicon.ico"} />
        </div>
    );
}

export default Edit;