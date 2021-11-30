import React from 'react';
import {
    Paper,
    Avatar,
    Grid,
    Chip,
    Stack,
    CardContent,
    CardActions,
    Card,
    Typography,
    CardHeader,
    Button,
    Box,
    IconButton,
    Container,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";


// TEMP:
const title = "Fishing for Biginners";
const desc = "Firstly, Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a";
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
        desc: "Firstly, Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a",
        imagePath: "logo192.png",
    },
    {
        title: "Buy goods",
        subtitle: "e.g. hooks, rots",
        desc: "I recommend you to ...",
        imagePath: "logo192.png",
    },
    {
        title: "Go to sea",
        subtitle: "Beware the sunburn",
        desc: "When you get...",
        imagePath: "logo192.png",
    },
]


type RoutineElement = {
    title: string;
    subtitle: string;
    desc: string;
    imagePath: string;
}


function RoutineContents() {
    const avatarSize = 35;

    const handleFavorite = () => {
        console.log("Favorite");
    }

    const handleShare = () => {
        console.log("Share");
    }

    const hashtagChipList = hashtagList.map((hashtag: string) =>
        <Chip clickable label={"# " + hashtag} />
    );

    const header = (
        <Paper>
            <Box ml={3}>
                <Grid container spacing={2} columns={10}>
                    <Grid item xs={8}>
                        <Grid container spacing={3} direction="column">
                            <Grid item>
                                <h1>{title}</h1>
                                <h3>{desc}</h3>

                                <Stack direction="row" spacing={1}>
                                    {hashtagChipList}
                                </Stack>
                            </Grid>

                            <Grid item>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{
                                        my: 1,
                                    }}
                                >
                                    <FavoriteIcon
                                        sx={{ my: -0.4 }}
                                    />
                                    <Typography>
                                        30
                                    </Typography>

                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={2} sx={{my:2}}>
                        <Paper variant="outlined">
                            <Container>
                                <Grid container spacing={0} direction="column">
                                    <Grid item>
                                        <Grid container direction="row" spacing={1}>
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
                                                <h3>{contributor}</h3>
                                            </Grid>
                                        </Grid>
                                        <Chip clickable variant="outlined" label="follow" />
                                    </Grid>

                                    <Grid item>
                                        <h4>last updated: {lastUpdated}</h4>
                                    </Grid>

                                    <Grid item>
                                        <Stack
                                            direction="row"
                                            sx={{
                                                my: 1,
                                            }}
                                        >
                                            <IconButton onClick={handleFavorite}>
                                                <FavoriteIcon />
                                            </IconButton>
                                            <IconButton onClick={handleShare}>
                                                <ShareIcon />
                                            </IconButton>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Paper>
                    </Grid>
                </Grid>
            </Box >
        </Paper>
    );


    return (
        <div>
            <Stack spacing={3} direction="column">
                {header}

                <Stack direction="column" spacing={0}>
                    {routineElementList.map((routineElement: RoutineElement, idx: number) =>
                        <Card variant="outlined">
                            <CardContent>
                                <Grid container spacing={2} columns={10}>
                                    <Grid item xs={8}>
                                        <Card>
                                            <CardHeader
                                                title={(idx + 1) + ". " + routineElement.title}
                                                subheader={routineElement.subtitle}
                                            />
                                            <CardContent>
                                                <Typography paragraph>
                                                    {routineElement.desc}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">Learn More</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>

                                    <Grid item xs={1}>
                                        <img
                                            height="200"
                                            src={routineElement.imagePath}
                                            alt="img"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    )}
                </Stack>
            </Stack>
        </div>
    );
}

export default RoutineContents;