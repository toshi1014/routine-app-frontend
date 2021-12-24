import React from 'react';
import {
    Grid,
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
import { useNavigate } from "react-router-dom";
import { MenuChildProps, RoutinePackContents } from "../utils/Types";
import { deleteApi } from "../api_handlers/handle";


const menuContentList = [
    "All",
    "Fabs",
    "Posted",
    "Liked",
];


type Props = {
    usernameComp: React.ReactElement;
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


function MyPageBase(props: Props) {
    const navigate = useNavigate();
    const avatarSize = 80;

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

    const postedListComp = props.postedList.map((posted, idx: number) =>
        <Grid item key={idx}>
            <RoutinePack
                id={posted.id}
                contributor={posted.contributor}
                contributorId={posted.contributorId}
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
                title={favorite.title}
                desc={favorite.desc}
                titleStep1={favorite.titleStep1}
                descStep1={favorite.descStep1}
                like={favorite.like}
            />
        </Grid>
    );


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
                            <Grid container direction="row" spacing={3}>
                                <Grid item>
                                    <Avatar
                                        alt="Smiley"
                                        src={process.env.PUBLIC_URL + "/static/demo/face.png"}
                                        sx={{
                                            width: avatarSize,
                                            height: avatarSize,
                                            my: 1.2,
                                        }}
                                    />
                                </Grid>

                                <Grid item>
                                    <Box
                                        component="div"
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            my: 6,
                                        }}
                                    >
                                    </Box>
                                    {props.usernameComp}
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item sx={{ mx: 2, my: -3 }}>
                            <Stack direction="row" spacing={1}>
                                <ChatBubbleOutlineIcon />
                                {props.statusMessageComp}
                            </Stack>
                            <Box
                                component="div"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    my: 4,
                                }}
                            >
                            </Box>
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
                            <Grid container direction="row" spacing={2}>
                                <Grid item sx={{ my: 2 }}>
                                    <Chip clickable variant="outlined" label="follow" />
                                </Grid>
                                <Grid item>
                                    <h4>Following {props.followingNum} / Followers {props.followersNum}</h4>
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
                    <h2>Posted</h2>
                    {props.postedList.length == 0 ?
                        <h4>no posts yet</h4>
                        :
                        <Grid container direction="row" spacing={1}>
                            {postedListComp}
                        </Grid>
                    }
                </CardContent>

                <CardContent>
                    <h2>Favorites</h2>
                    {props.favoriteList.length == 0 ?
                        <h4>no favorites yet</h4>
                        :
                        <Grid container direction="row" spacing={1}>
                            {favoriteListComp}
                        </Grid>
                    }
                </CardContent>

                {
                    (props.draftList && props.draftList.length !== 0)
                        ?
                        <CardContent>
                            <h2>Drafts</h2>
                            <Grid container direction="row" spacing={1}>
                                {props.draftList.map((draft, idx: number) =>
                                    <Grid item key={idx}>
                                        <RoutinePack
                                            id={draft.id}
                                            contributor={draft.contributor}
                                            contributorId={draft.contributorId}
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