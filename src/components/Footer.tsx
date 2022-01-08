import React from 'react';
import {
    Link,
} from "react-router-dom";
import {
    Stack,
    Box,
    Typography,
    Grid,
    IconButton,
    Divider,
} from "@mui/material";
import Facebookicon from "@mui/icons-material/Facebook";
import Twitter from "@mui/icons-material/Twitter";
import Instagram from "@mui/icons-material/Instagram";


// TEMP:
const logoFilename = "logo192.png";
const logoSize = "40";
const copyright = "(c) 2021 Foo. All rights reserved";


type LinkName = {
    name: string;
    link: string;
}

const footerLinkList: Array<LinkName> = [
    {
        name: "Top",
        link: ""
    },
    {
        name: "RoutineContents",
        link: "routine_contents/0"
    },
    {
        name: "SearchResults",
        link: "search_results"
    },
    {
        name: "Post",
        link: "post"
    },
    {
        name: "Login",
        link: "login"
    },
    {
        name: "Signup",
        link: "signup"
    },
    {
        name: "MyPage",
        link: "mypage/0"
    },
    {
        name: "MyPageLogin",
        link: "mypage_login"
    },
    {
        name: "Debug",
        link: "debug"
    },
];

function Footer() {
    const footerLinks = footerLinkList.map((linkName: LinkName, idx: number) =>
        <Link
            to={"/" + linkName.link}
            style={{
                textDecoration: "none",
            }}
            key={idx}
        >
            {linkName.name}
        </Link>
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

    return (
        <Box sx={{ mt: 5 }}>
            <Divider
                sx={{
                    m: 3
                }}
                orientation="horizontal"
                textAlign="center"
            >
                Foo
            </Divider>

            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={3}
            >
                <Grid item>
                    <Stack direction="row" spacing={3} alignItems="center">
                        <img
                            src={process.env.PUBLIC_URL + "/" + logoFilename}
                            width={logoSize}
                            height={logoSize}
                            alt="logo"
                        />
                        <Typography variant="h5">Foo</Typography>
                    </Stack>
                </Grid>

                <Grid item>
                    <Stack spacing={3}>
                        {footerLinks}
                    </Stack>
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

                <Grid item sx={{ mb: 3 }}>
                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="body2" style={{ color: "gray" }}>
                            {copyright}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Footer;