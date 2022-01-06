import React from 'react';
import {
    Paper,
    Avatar,
    Grid,
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
import {
    RoutineHeader,
    RoutineHeaderInput,
    RoutineElement,
    RoutineElementInput,
} from "../utils/Types";
import FollowButton from "./FollowButton";
import UserAvatar from "./UserAvatar";


type Props = {
    routineHeader: RoutineHeader | RoutineHeaderInput;
    routineElementList: Array<RoutineElement | RoutineElementInput>;
    hashtagChipList: Array<React.ReactElement>;
    handleFavorite: () => void;
    handleShare: () => void;
    uniqueCompHeader?: React.ReactElement;
    uniqueComp?: React.ReactElement;
}

function ContentsBase(props: Props) {
    const header = (
        <Paper sx={{ my: 1 }}>
            <Box ml={3}>
                <Grid container spacing={2} columns={10}>
                    <Grid item xs={8}>
                        <Grid container spacing={3} direction="column">
                            <Grid item>
                                <Grid container direction="column" spacing={2}>
                                    <Typography
                                        variant="h4"
                                        mt={5}
                                        ml={2}
                                    >
                                        {props.routineHeader.title}
                                    </Typography>

                                    <Typography
                                        variant="h6"
                                        mt={3}
                                        ml={4}
                                    >
                                        {props.routineHeader.desc}
                                    </Typography>

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
                                        {props.uniqueCompHeader}
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="flex-start"
                                >
                                    <FavoriteIcon />
                                    <Typography
                                        variant="body1"
                                    >
                                        {props.routineHeader.like} Like
                                    </Typography>

                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={2} sx={{ my: 2 }}>
                        <Paper variant="outlined">
                            <Container>
                                <Grid container spacing={0} direction="column">
                                    <Grid item>
                                        <Grid container direction="row" spacing={1}>
                                            <Grid item>
                                                <UserAvatar badge={props.routineHeader.badge} />
                                            </Grid>
                                            <Grid item>
                                                <h3>{props.routineHeader.contributor}</h3>
                                            </Grid>
                                        </Grid>

                                        <FollowButton
                                            targetUserId={props.routineHeader.contributorId}
                                        />

                                    </Grid>

                                    <Grid item>
                                        <h4>last updated: {props.routineHeader.lastUpdated}</h4>
                                    </Grid>

                                    <Grid item>
                                        <Stack
                                            direction="row"
                                            sx={{
                                                my: 1,
                                            }}
                                        >
                                            <IconButton onClick={props.handleFavorite}>
                                                <FavoriteIcon />
                                            </IconButton>
                                            <IconButton onClick={props.handleShare}>
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
        </Paper >
    );

    const contents = props.routineElementList.map(
        (routineElement: RoutineElement | RoutineElementInput, idx: number) => (
            <Card variant="outlined" key={idx}>
                <CardContent>
                    <Grid container spacing={2} columns={10}>
                        <Grid item xs={8}>
                            <Card>
                                <CardHeader
                                    title={
                                        <div>
                                            {(idx + 1) + ". "}
                                            {routineElement.title}
                                        </div>
                                    }
                                    subheader={routineElement.subtitle}
                                />
                                <CardContent>
                                    {routineElement.desc}
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid>

                        <Grid item xs={1}>
                            <img
                                height="200"
                                src={process.env.PUBLIC_URL + "/" + routineElement.imagePath}
                                alt="img"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        ));


    return (
        <div>
            <Stack spacing={3} direction="column">
                {header}

                <Stack direction="column" spacing={0}>
                    {contents}
                    {props.uniqueComp}
                </Stack>
            </Stack>
        </div>
    );
}

export default ContentsBase;