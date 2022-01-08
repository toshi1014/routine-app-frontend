import React from 'react';
import { useNavigate } from "react-router-dom";
import PostEditBase from "./PostEditBase";
import {
    getContentsApi,
    getDraftApi,
} from "../api_handlers/handle";
import {
    RoutineHeader,
    RoutineElement,
} from "../utils/Types";
import {
    defaultHeader,
    defaultElementList,
    defaultPostId,
} from "../utils/defaultValues";
import CircularProgressWithText from "./CircularProgressWithText";


function Edit() {
    const navigate = useNavigate();

    const href = window.location.href;
    const splitHref = href.split('/');
    const splitHrefLength = splitHref.length;
    const postOrDraft = splitHref[splitHrefLength - 2];
    const id = Number(splitHref[splitHrefLength - 1]);

    const [header, setHeader] = React.useState<RoutineHeader>(defaultHeader);
    const [elementList, setElementList] = React.useState<Array<RoutineElement>>(defaultElementList);
    const [postId, setPostId] = React.useState(defaultPostId);

    React.useEffect(() => {
        const init = async () => {
            setPostId(id);

            const res = (
                postOrDraft === "post"
                    ? await getContentsApi(id)
                    : await getDraftApi(id)
            );

            if (res.status) {
                console.log(res.contents);
                setHeader(res.contents.header);
                setElementList(res.contents.elementList);
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
        // XXX: useState don't got updated
        (header !== defaultHeader) && (elementList !== defaultElementList) && (postId !== defaultPostId)
            ?
            <PostEditBase
                header={header}
                elementList={elementList}
                postId={postId}
                boolEditedDraft={postOrDraft == "draft" ? true : false}
            />
            : <CircularProgressWithText
                open={true}
                whatURwating4="Fetching"
            />
    );
}

export default Edit;