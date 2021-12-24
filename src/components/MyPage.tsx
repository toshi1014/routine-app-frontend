import React from 'react';
import {
    Typography,
    Chip,
} from "@mui/material";
import MyPageBase from "./MyPageBase";
import { ListItem } from "../utils/ListItem";
import HashtagLink from "./HashtagLink";
import {
    getMypageApi,
} from "../api_handlers/handle";
import {
    RoutinePackContents,
    ChipData,
} from "../utils/Types";
import {
    defaultId,
    defaultUsername,
    defaultStatusMessage,
    defaultHashtagList,
    defaultFollowingNum,
    defaultFollowersNum,
    defaultTitle,
    defaultContributor,
    defaultContributorId,
    defaultDesc,
    defaultTitleStep1,
    defaultDescStep1,
    defaultLike,
} from "../utils/defaultValues";


function MyPage() {
    const href = window.location.href;
    const splitHref = href.split('/');
    const splitHrefLength = splitHref.length;
    const userId = Number(splitHref[splitHrefLength - 1]);

    const [username, setUsername] = React.useState(defaultUsername);
    const [statusMessage, setStatusMessage] = React.useState(defaultStatusMessage);
    const [hashtagList, setHashtagList] = React.useState<Array<string>>(defaultHashtagList);
    const [followingNum, setFollowingNum] = React.useState(defaultFollowingNum);
    const [followersNum, setFollowersNum] = React.useState(defaultFollowersNum);


    // hashtag
    const hashtagChipList = hashtagList.map((hashtag: string, idx: number) =>
        <ListItem key={idx}>
            <HashtagLink
                hashtag={hashtag}
            />
        </ListItem>
    );
    // end; hashtag

    const [postedList, setPostedList] =
        React.useState<Array<RoutinePackContents>>([
            {
                id: defaultId,
                contributor: defaultContributor,
                contributorId: defaultContributorId,
                title: defaultTitle,
                desc: defaultDesc,
                titleStep1: defaultTitleStep1,
                descStep1: defaultDescStep1,
                like: defaultLike,
            }
        ]);
    // const favoriteList = postedList;
    const favoriteList: Array<RoutinePackContents> = [];    // TEMP: fav list


    React.useEffect(() => {
        const init = async () => {
            const res = await getMypageApi(userId);
            if (res.status) {
                setUsername(res.contents.header.username);
                setStatusMessage(res.contents.header.statusMessage);
                setHashtagList(res.contents.header.hashtagList);
                setFollowingNum(res.contents.header.followingNum);
                setFollowersNum(res.contents.header.followersNum);
                setPostedList(res.contents.postedList);
                console.log("contents:", res.contents);
            } else {
                console.log("Err");
            }
        }
        if (userId !== 0) {
            init();
        }
    }, [])


    return (
        <MyPageBase
            usernameComp={<h1>{username}</h1>}
            statusMessageComp={<Typography paragraph>{statusMessage}</Typography>}
            followingNum={followingNum}
            followersNum={followersNum}
            hashtagList={hashtagList}
            hashtagChipList={hashtagChipList}
            postedList={postedList}
            favoriteList={favoriteList}
        />
    );
}

export default MyPage;