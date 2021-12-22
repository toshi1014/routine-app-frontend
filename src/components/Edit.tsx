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


const defaultHeader: RoutineHeader = {
    title: "Fishing for Biginners",
    desc: "Firstly, Heat oil in a (14- to 16-inch) paella pan or a large",
    like: 30,
    contributor: "John Smith",
    lastUpdated: "2021, Jul 4",
    hashtagList: [
        "fishing",
        "hoby",
    ]
}

const defaultElementList: Array<RoutineElement> = [
    {
        title: "Go to fishing shops",
        subtitle: "Why not?",
        desc: "Firstly, Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a",
        imagePath: "logo192.png",
    },
    {
        title: "Buy goods",
        subtitle: "e.g. hooks, rots",
        desc: "I recommend you to ...",
        imagePath: "logo192.png",
    },
    {
        title: "Go to sea",
        subtitle: "Beware the sunburn",
        desc: "When you get...",
        imagePath: "logo192.png",
    },
]

const defaultPostId = 0;

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
        (
            // XXX: useState don't got updated
            (header !== defaultHeader) && (elementList !== defaultElementList) && (postId !== defaultPostId)
                ?
                <PostEditBase
                    header={header}
                    elementList={elementList}
                    postId={postId}
                    boolEditedDraft={postOrDraft == "draft" ? true : false}
                />
                : <div><h3>Thanks for your patience!</h3></div>
        )
    );
}

export default Edit;