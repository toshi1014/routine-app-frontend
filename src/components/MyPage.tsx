import React from 'react';
import {
    Typography,
} from "@mui/material";
import MyPageBase from "./MyPageBase";
import { ListItem } from "../utils/ListItem";
import HashtagLink from "./HashtagLink";
import ErrorPage from "./ErrorPage";
import {
    getMypageApi,
} from "../api_handlers/handle";
import {
    RoutinePackContents,
    Badge,
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
    defaultBadge,
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
    const [badge, setBadge] = React.useState<Badge>(defaultBadge);
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
                badge: defaultBadge,
                title: defaultTitle,
                desc: defaultDesc,
                titleStep1: defaultTitleStep1,
                descStep1: defaultDescStep1,
                like: defaultLike,
            }
        ]);

    const [favoriteList, setFavoriteList] =
        React.useState<Array<RoutinePackContents>>(postedList);

    const [apiErrorMessage, setApiErrorMessage] = React.useState("");

    React.useEffect(() => {
        const init = async () => {
            const res = await getMypageApi(userId);
            if (res.status) {
                setUsername(res.contents.header.username);
                setBadge(res.contents.header.badge);
                setStatusMessage(res.contents.header.statusMessage);
                setHashtagList(res.contents.header.hashtagList);
                setFollowingNum(res.contents.header.followingNum);
                setFollowersNum(res.contents.header.followersNum);
                setPostedList(res.contents.postedList);
                setFavoriteList(res.contents.favoriteList);
                console.log("contents:", res.contents);
            } else {
                setApiErrorMessage(res.errorMessage);
            }
        }
        if (userId !== 0) {
            init();
        }
    }, [])


    return (
        apiErrorMessage === ""
            ?
            <MyPageBase
                usernameComp={<Typography variant="h4">{username}</Typography>}
                badge={badge}
                statusMessageComp={<Typography variant="body1">{statusMessage}</Typography>}
                followingNum={followingNum}
                followersNum={followersNum}
                hashtagList={hashtagList}
                hashtagChipList={hashtagChipList}
                postedList={postedList}
                favoriteList={favoriteList}
            />
            : <ErrorPage errorMessage={apiErrorMessage} />
    );
}

export default MyPage;