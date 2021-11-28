import React from 'react';
import {
    Link,
} from "react-router-dom";
import {
    Stack,
    Box,
    Grid,
    IconButton,
} from "@mui/material";
import Facebookicon from "@mui/icons-material/Facebook";
import Twitter from "@mui/icons-material/Twitter";
import Instagram from "@mui/icons-material/Instagram";


// TEMP:
const logoFilename = "logo192.png";
const logoSize = "40";
const copyright = "(c) 2021 Foo. All rights reserved";


function Footer() {
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
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <img
                    src={logoFilename}
                    width={logoSize}
                    height={logoSize}
                    alt="logo"
                />
                <h2>Foo</h2>
            </Grid>

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <div>
                    <Stack direction="row" spacing={6}>
                        <Link
                            to="/"
                            style={{
                                textDecoration: "none"
                            }}
                        >
                            Top
                        </Link>
                        <Link
                            to="/routine_contents"
                            style={{
                                textDecoration: "none"
                            }}
                        >
                            RoutineContents
                        </Link>
                    </Stack>
                </div>
            </Grid>

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
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
        </div>
    );
}

export default Footer;
