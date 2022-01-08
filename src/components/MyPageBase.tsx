import React from 'react';
import {
    Grid,
    Button,
    CardContent,
    Avatar,
    Box,
    Container,
    Typography,
    IconButton,
    Card,
    Paper,
    Stack,
    Chip,
} from "@mui/material";
import SearchBox from './SearchBox';
import RoutinePack from './RoutinePack';
import Facebookicon from "@mui/icons-material/Facebook";
import Twitter from "@mui/icons-material/Twitter";
import Instagram from "@mui/icons-material/Instagram";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useNavigate } from "react-router-dom";
import {
    RoutinePackContents,
    Badge,
} from "../utils/Types";
import FollowButton from "./FollowButton";
import {
    deleteApi,
} from "../api_handlers/handle";
import FollowList from "./FollowList";
import { decodeJwt } from "../utils/utils";
import UserAvatar from "./UserAvatar";


const menuContentList = [
    "All",
    "Fabs",
    "Posted",
    "Liked",
];


type Props = {
    usernameComp: React.ReactElement;
    badge: Badge;
    statusMessageComp: React.ReactElement;
    followingNum: number;
    followersNum: number;
    hashtagList: Array<string>;
    hashtagChipList: Array<React.ReactElement>;
    chipInputComp?: React.ReactElement;
    postedList: Array<RoutinePackContents>;
    favoriteList: Array<RoutinePackContents>;
    draftList?: Array<RoutinePackContents>;
}


const token = localStorage.getItem("token")
const userIdFromToken = (token === null) ? null : decodeJwt(token).id;

const href = window.location.href;
const splitHref = href.split('/');
const splitHrefLength = splitHref.length;
const userIdFromUrl = Number(splitHref[splitHrefLength - 1]);

const targetUserId = (isNaN(userIdFromUrl) ? userIdFromToken : userIdFromUrl);


function MyPageBase(props: Props) {
    const navigate = useNavigate();
    const avatarSize = 70;

    const handleClickEdit = (strPostOrDraft: string, id: number) => {
        navigate("edit/" + strPostOrDraft + "/" + id);
    }

    const handleClickDelete = async (strPostOrDraft: string, id: number) => {
        const res = await deleteApi(strPostOrDraft, id);
        if (!res.status) {
            // force logout & redirect to login
            localStorage.removeItem("token");
            navigate("/login");
        }
        window.location.reload();
    }

    const [myFollowCnt, setMyFollowCnt] = React.useState(0);

    const postedListComp = props.postedList.map((posted, idx: number) =>
        <Grid item key={idx}>
            <RoutinePack
                id={posted.id}
                contributor={posted.contributor}
                contributorId={posted.contributorId}
                badge={posted.badge}
                title={posted.title}
                desc={posted.desc}
                titleStep1={posted.titleStep1}
                descStep1={posted.descStep1}
                like={posted.like}
                editable={props.chipInputComp ? true : false}
                handleClickEdit={
                    () => handleClickEdit("post", posted.id)
                }
                handleClickDelete={
                    () => handleClickDelete("post", posted.id)
                }
            />
        </Grid>
    );

    const favoriteListComp = props.favoriteList.map((favorite, idx: number) =>
        <Grid item key={idx}>
            <RoutinePack
                id={favorite.id}
                contributor={favorite.contributor}
                contributorId={favorite.contributorId}
                badge={favorite.badge}
                title={favorite.title}
                desc={favorite.desc}
                titleStep1={favorite.titleStep1}
                descStep1={favorite.descStep1}
                like={favorite.like}
            />
        </Grid>
    );

    const [followListTitle, setFollowListTitle] = React.useState("FollowList");
    const [openFollowList, setOpenFollwList] = React.useState(false);
    const handleCloseFollowList = () => {
        setOpenFollwList(false);
    }
    const handleClickFollow = (followingOrFollowers: string) => {
        if (followingOrFollowers === "following") {
            setOpenFollwList(true);
            setFollowListTitle("Following");
        } else if (followingOrFollowers === "followers") {
            setOpenFollwList(true);
            setFollowListTitle("Followers");
        } else {
            throw new Error("unknown followingOrFollowers " + followingOrFollowers);
        }
    }

    const handleFacebook = () => {
        console.log("Facebook");
    }
    const handleTwitter = () => {
        console.log("Twitter");
    }
    const handleInstagram = () => {
        console.log("Instaragram");
    }

    const header = (
        <Paper sx={{ my: 1 }}>
            <Container>
                <CardContent>
                    <Grid container direction="column" spacing={2}>

                        <Grid item>
                            <Stack direction="row" spacing={3} alignItems="flex-end">
                                <UserAvatar
                                    userId={targetUserId}
                                    badge={props.badge}
                                    size={avatarSize}
                                />
                                <div>{props.usernameComp}</div>
                            </Stack>
                        </Grid>

                        <Grid item sx={{ mt: 1 }}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <ChatBubbleOutlineIcon />
                                {props.statusMessageComp}
                            </Stack>
                        </Grid>

                        <Grid item>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    listStyle: 'none',
                                    p: 0.5,
                                    m: 0,
                                }}
                                component="ul"
                            >
                                {props.hashtagChipList}
                            </Box>
                        </Grid>

                        <Grid item>
                            {props.chipInputComp}
                        </Grid>

                        <Grid item>
                            <Grid container alignItems="center" direction="row" spacing={3}>
                                <Grid item>
                                    <FollowButton
                                        targetUserId={targetUserId}
                                        disabled={Boolean(props.draftList)}
                                        myFollowCnt={myFollowCnt}
                                        setMyFollowCnt={setMyFollowCnt}
                                    />
                                </Grid>
                                <Grid item>
                                    <FollowList
                                        open={openFollowList}
                                        userId={targetUserId}
                                        title={followListTitle}
                                        onClose={handleCloseFollowList}
                                    />

                                    Following
                                        <Button
                                        variant="text"
                                        size="small"
                                        disabled={props.followingNum === 0 ? true : false}
                                        onClick={() => handleClickFollow("following")}
                                    >
                                        {props.followingNum}
                                    </Button>

                                    Followers
                                        <Button
                                        variant="text"
                                        size="small"
                                        disabled={(props.followersNum + myFollowCnt) === 0 ? true : false}
                                        onClick={() => handleClickFollow("followers")}
                                    >
                                        {props.followersNum + myFollowCnt}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Stack direction="row" spacing={2}>
                                <IconButton onClick={handleFacebook}>
                                    <Facebookicon />
                                </IconButton>

                                <IconButton onClick={handleTwitter}>
                                    <Twitter />
                                </IconButton>

                                <IconButton onClick={handleInstagram}>
                                    <Instagram />
                                </IconButton>
                            </Stack>
                        </Grid>

                    </Grid>
                </CardContent>
            </Container>
        </Paper>
    );


    return (
        <div>
            {header}

            <Grid container direction="column">
                <Grid item>
                    <CardContent>
                        <SearchBox
                            defaultValue=""
                            defaultTarget=""
                            menuContentList={menuContentList}
                        />
                    </CardContent>
                </Grid>

                <CardContent>
                    <Typography variant="h5" sx={{ mb: 1 }}>Posted</Typography>
                    {props.postedList.length == 0
                        ? <Typography variant="body1">no posts yet</Typography>
                        : <Grid container direction="row" spacing={1}>
                            {postedListComp}
                        </Grid>
                    }
                </CardContent>


                <CardContent>
                    <Stack direction="row" alignItems="flex-start">
                        <Typography variant="h5" sx={{ mb: 1 }}>
                            Favorites
                        </Typography>

                        <BookmarkIcon />
                    </Stack>

                    {props.favoriteList.length == 0
                        ? <Typography variant="body1">no favorites yet</Typography>
                        : <Grid container direction="row" spacing={1}>
                            {favoriteListComp}
                        </Grid>
                    }
                </CardContent>

                {
                    (props.draftList && props.draftList.length !== 0)
                        ? <CardContent>
                            <Typography variant="h5" sx={{ mb: 1 }}>Drafts</Typography>
                            <Grid container direction="row" spacing={1}>
                                {props.draftList.map((draft, idx: number) =>
                                    <Grid item key={idx}>
                                        <RoutinePack
                                            id={draft.id}
                                            contributor={draft.contributor}
                                            contributorId={draft.contributorId}
                                            badge={draft.badge}
                                            title={draft.title}
                                            desc={draft.desc}
                                            titleStep1={draft.titleStep1}
                                            descStep1={draft.descStep1}
                                            like={draft.like}
                                            editable={props.chipInputComp ? true : false}
                                            handleClickEdit={
                                                () => handleClickEdit("draft", draft.id)
                                            }
                                            handleClickDelete={
                                                () => handleClickDelete("draft", draft.id)
                                            }
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </CardContent>
                        : <div></div>
                }
            </Grid>
        </div >
    );
}

export default MyPageBase;