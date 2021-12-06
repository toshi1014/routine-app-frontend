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
import { MenuChildProps, RoutinePackContents } from "../utils/Types";


type Props = {
    usernameComp: React.ReactElement;
    statusMessageComp: React.ReactElement;
    followingNum: number;
    followersNum: number;
    hashtagList: Array<string>;
    hashtagChipList: Array<React.ReactElement>;
    uniqueComp?: React.ReactElement;
    postedList: Array<RoutinePackContents>;
    faboriteList: Array<RoutinePackContents>;
    menuChildProps: MenuChildProps;
}


function MyPageBase(props: Props) {
    const avatarSize = 80;

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
        props.menuChildProps.setSearchBoxValue(props.hashtagList[idx]);
        handleMenuClose();
    }
    // end; Menu

    const postedListComp = props.postedList.map((posted, idx: number) =>
        <Grid item key={idx}>
            <RoutinePack
                contributor={posted.contributor}
                title={posted.title + idx}
                desc={posted.desc}
                lastUpdated={posted.lastUpdated}
                titleStep1={posted.titleStep1}
                descStep1={posted.descStep1}
            />
        </Grid>
    );

    const faboriteListComp = props.faboriteList.map((posted, idx: number) =>
        <Grid item key={idx}>
            <RoutinePack
                contributor={posted.contributor}
                title={posted.title + idx}
                desc={posted.desc}
                lastUpdated={posted.lastUpdated}
                titleStep1={posted.titleStep1}
                descStep1={posted.descStep1}
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
                            {props.uniqueComp}
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
                            anchorEl={anchorEl}
                            searchBoxValue={props.menuChildProps.searchBoxValue}
                            onChange={props.menuChildProps.handleSearchBox}
                            menuContents={props.hashtagList}
                            handleMenuClick={handleMenuClick}
                            handleMenuClose={handleMenuClose}
                            handleMenuContentClick={handleMenuContentClick}
                        />
                    </CardContent>
                </Grid>

                <CardContent>
                    <h2>Posted</h2>
                    <Grid container direction="row" spacing={1}>
                        {postedListComp}
                    </Grid>
                </CardContent>

                <CardContent>
                    <h2>Faborites</h2>
                    <Grid container direction="row" spacing={1}>
                        {faboriteListComp}
                    </Grid>
                </CardContent>
            </Grid>
        </div >
    );
}

export default MyPageBase;