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
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Facebookicon from "@mui/icons-material/Facebook";
import Twitter from "@mui/icons-material/Twitter";
import Instagram from "@mui/icons-material/Instagram";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { range } from "../utils/utils";
import { RoutineHeader, RoutineElement } from "../utils/Types";


// TEMP:
const hashtagList = [
    "fishing",
    "hobby",
    "cooking",
    "DIY",
    "English",
    "workout",
];
const menuContentList = hashtagList;
const username = "John Smith";
const title = "Happy Coding";
const desc = "Best Way to Create App, set aside off of the heat to let rest for 10 minutes, and then serve.";
const lastUpdated = "2021, Dec 31";
const titleStep1 = "Buy Computer";
const descStep1 = "Choose best computer for you, set aside off of the heat to let rest for 10 minutes, and then serve.";
const like = 0;
// const statusMessage = "G'day!";
const statusMessage = "Choose best computer for you, set aside off of the heat to let rest for 10 minutes, and then serve.";
const followersNum = 10;
const followingNum = 10;


function MyPage() {
    const avatarSize = 80;

    const [searchBoxValue, setSearchBoxValue] = React.useState("");

    const handleSearchBox = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const input = event.target.value;
        setSearchBoxValue(input);
    }

    // Menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleMenuClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setAnchorEl(event.currentTarget);
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
    }
    const handleMenuContentClick = (
        event: React.MouseEvent<HTMLElement>,
        idx: number
    ) => {
        setSearchBoxValue(menuContentList[idx]);
        handleMenuClose();
    }
    // end; Menu



    const hashtagChipList = hashtagList.map((hashtag: string, idx: number) =>
        <Chip clickable label={"# " + hashtag} key={idx} />
    );

    const resultList = range(0, 5).map((idx: number) =>
        <Grid item key={idx}>
            <RoutinePack
                contributor={username}
                title={title + idx}
                desc={desc}
                lastUpdated={lastUpdated}
                titleStep1={titleStep1}
                descStep1={descStep1}
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
                                        src="static/demo/face.png"
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
                                    <h1>{username}</h1>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item sx={{ mx: 2, my: -3 }}>
                            <Stack direction="row" spacing={1}>
                                <ChatBubbleOutlineIcon />
                                <Typography paragraph>{statusMessage}</Typography>
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
                            <Stack direction="row" spacing={1}>
                                {hashtagChipList}
                            </Stack>
                        </Grid>

                        <Grid item>
                            <Grid container direction="row" spacing={2}>
                                <Grid item sx={{ my: 2 }}>
                                    <Chip clickable variant="outlined" label="follow" />
                                </Grid>
                                <Grid item>
                                    <h4>Following {followingNum} / Followers {followersNum}</h4>
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
                            anchorEl={anchorEl}
                            searchBoxValue={searchBoxValue}
                            onChange={handleSearchBox}
                            menuContents={menuContentList}
                            handleMenuClick={handleMenuClick}
                            handleMenuClose={handleMenuClose}
                            handleMenuContentClick={handleMenuContentClick}
                        />
                    </CardContent>
                </Grid>

                <CardContent>
                    <h2>Posted</h2>
                    <Grid container direction="row" spacing={1}>
                        {resultList}
                    </Grid>
                </CardContent>

                <CardContent>
                    <h2>Faborites</h2>
                    <Grid container direction="row" spacing={1}>
                        {resultList}
                    </Grid>
                </CardContent>
            </Grid>
        </div >
    );
}

export default MyPage;