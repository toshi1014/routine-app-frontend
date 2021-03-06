import React from 'react';
import { RoutineHeader, RoutineElement } from "../utils/Types";
import ContentsBase from "./ContentsBase";
import { ListItem } from "../utils/ListItem";
import { getContentsApi } from "../api_handlers/handle";
import HashtagLink from "./HashtagLink";
import ErrorPage from "./ErrorPage";
import {
    defaultHeader,
    defaultElementList,
} from "../utils/defaultValues";


function RoutineContents() {
    const href = window.location.href;
    const splitHref = href.split('/');
    const splitHrefLength = splitHref.length;
    const id = Number(splitHref[splitHrefLength - 1]);

    const [header, setHeader] = React.useState<RoutineHeader>(defaultHeader);
    const [elementList, setElementList] = React.useState<Array<RoutineElement>>(defaultElementList);

    const defaultHashtagChipList = defaultHeader.hashtagList.map((hashtag: string, idx: number) =>
        <ListItem key={idx}>
            <HashtagLink
                hashtag={hashtag}
                key={idx}
            />
        </ListItem>
    );
    const [hashtagChipList, setHashtagChipList] = React.useState<Array<React.ReactElement>>(defaultHashtagChipList);

    const [apiErrorMessage, setApiErrorMessage] = React.useState("");

    React.useEffect(() => {
        const init = async () => {
            const res = await getContentsApi(id);

            if (res.status) {
                console.log(res.contents);
                setHeader(res.contents.header);
                setElementList(res.contents.elementList);
                const hashtagChipListTmp = res.contents.header.hashtagList.map((hashtag: string, idx: number) =>
                    <ListItem key={idx}>
                        <HashtagLink
                            hashtag={hashtag}
                            key={idx}
                        />
                    </ListItem>
                );
                setHashtagChipList(hashtagChipListTmp);
            } else {
                setApiErrorMessage(res.errorMessage);
            }
        }

        if (id !== 0) {
            init();
        }
    }, [])


    return (
        apiErrorMessage === ""
            ? <ContentsBase
                id={id}
                routineHeader={header}
                routineElementList={elementList}
                hashtagChipList={hashtagChipList}
            />
            : <ErrorPage errorMessage={apiErrorMessage} />
    );
}

export default RoutineContents;