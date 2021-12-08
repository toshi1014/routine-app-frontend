import React from 'react';
import {
    Link,
} from "react-router-dom";
import {
    Stack,
    Box,
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
        link: "routine_contents"
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
        link: "mypage"
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
        <div>
            <Box
                component="div"
                sx={{
                    whiteSpace: 'nowrap',
                    my: 10,
                }}
            >
            </Box>

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
                spacing="20px"
            >
                <Grid item>
                    <Stack direction="row" spacing={3}>
                        <img
                            src={logoFilename}
                            width={logoSize}
                            height={logoSize}
                            alt="logo"
                        />
                        <h2>Foo</h2>
                    </Stack>
                </Grid>

                <Grid item>
                    <Stack direction="row" spacing={4}>
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

                <Box
                    sx={{
                        textAlign: "center",
                    }}
                >
                    <h5 style={{ color: "gray" }}>{copyright}</h5>
                </Box>
            </Grid>
        </div >
    );
}

export default Footer;