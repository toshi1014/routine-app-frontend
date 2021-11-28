import React from 'react';
import {
    Paper,
    Avatar,
    Chip,
    Stack,
    CardContent,
    CardActions,
    Card,
    CardHeader,
    Button,
    Box,
    IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";


// TEMP:
const title = "Fishing for Biginners";
const desc = "This content tells you about...";
const contributor = "John Smith";
const lastUpdated = "2021, Jul 4";
const hashtagList = [
    "fishing",
    "hoby",
];
const routineElementList: Array<RoutineElement> = [
    {
        title: "Go to fishing shops",
        subtitle: "Why not?",
        desc: "Firstly, ...",
    },
    {
        title: "Buy goods",
        subtitle: "e.g. hooks, rots",
        desc: "I recommend you to ..."
    },
    {
        title: "Go to sea",
        subtitle: "Beware the sunburn",
        desc: "When you get..."
    },
]


type RoutineElement = {
    title: string;
    subtitle: string;
    desc: string;
}


function RoutineContents() {
    const avatarSize = 35;

    const handleFavorite = () => {
        console.log("Favorite");
    }

    const handleShare = () => {
        console.log("Share");
    }

    const header = (
        <Box ml={3}>
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
                    <Chip clickable label={"# " + hashtag} />
                )}
            </Stack>

            <h4>last updated: {lastUpdated}</h4>

            <Stack direction="row">
                <IconButton onClick={handleFavorite}>
                    <FavoriteIcon />
                </IconButton>
                <IconButton onClick={handleShare}>
                    <ShareIcon />
                </IconButton>
            </Stack>
        </Box >
    );


    return (
        <div>
            <Stack spacing={3}>
                <Paper>
                    {header}
                </Paper>

                <Stack direction="column" spacing={1}>
                    {routineElementList.map((routineElement: RoutineElement, idx: number) =>
                        <Card>
                            <CardHeader
                                title={(idx + 1) + ". " + routineElement.title}
                                subheader={routineElement.subtitle}
                            />
                            <CardContent>
                                {routineElement.desc}
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    )}
                </Stack>
            </Stack>
        </div>
    );
}

export default RoutineContents;