import React from 'react';
import {
    Paper,
    Avatar,
    Chip,
    Stack,
    CardContent,
    CardActions,
    Card,
    Button,
    Box,
    Container,
} from "@mui/material";


// TEMP:
const title = "Fishing for Biginners";
const desc = "This content tells you about...";
const contributor = "John Smith";
const lastUpdated = "2021, Jul 4";
const hashtagList = [
    "fishing",
    "hoby",
];


function RoutineContents() {
    const avatarSize = 35;

    const cardContent = (
        <React.Fragment>
            <CardContent>
                Foo
        </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </React.Fragment>
    );


    return (
        <div>
            <div>
                <Paper>
                    <h1>{title}</h1>
                    <h3>{desc}</h3>
                    <Stack direction="row">
                        <Avatar
                            alt="Smiley"
                            src="static/demo/face.jpg"
                            sx={{ width: avatarSize, height: avatarSize }}
                        />
                        <h3>{contributor}</h3>
                    </Stack>

                    <Stack direction="row">
                        {hashtagList.map((hashtag: string) =>
                            <Chip label={"# " + hashtag} />
                        )}
                    </Stack>

                    <h4>last updated: {lastUpdated}</h4>
                </Paper>
            </div>
            
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">{cardContent}</Card>
            </Box>

        </div>
    );
}

export default RoutineContents;