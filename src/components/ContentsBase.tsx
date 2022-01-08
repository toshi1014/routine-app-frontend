import React from 'react';
import {
    Paper,
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
import LikeButton from "./LikeButton";
import FavoriteButton from "./FavoriteButton";
import MenuButton from "./MenuButton";

type Props = {
    id: number;
    routineHeader: RoutineHeader | RoutineHeaderInput;
    routineElementList: Array<RoutineElement | RoutineElementInput>;
    hashtagChipList: Array<React.ReactElement>;
    uniqueCompHeader?: React.ReactElement;
    uniqueComp?: React.ReactElement;
}

function ContentsBase(props: Props) {
    const [myLikeCnt, setMyLikeCnt] = React.useState(0);

    const header = (
        <Paper sx={{ my: 1 }}>
            <Box ml={3}>
                <Grid container justifyContent="center">
                    <Grid item sx={{ flexGrow: 1 }}>
                        <CardContent>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <Typography
                                        variant="h4"
                                        mt={2}
                                    >
                                        {props.routineHeader.title}
                                    </Typography>
                                </Grid>

                                <Grid item>
                                    <Typography
                                        variant="h6"
                                        ml={2}
                                    >
                                        {props.routineHeader.desc}
                                    </Typography>
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
                                    {props.uniqueCompHeader}
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Grid>

                    <Grid item sx={{ mt: 2, mb: 1, mr: 1 }}>
                        <Paper
                            variant="outlined"
                            sx={{
                                width: 300,
                                borderRadius: 3,
                            }}
                        >
                            <CardContent>
                                <Grid container wrap="nowrap" spacing={2} direction="column">
                                    <Grid item xs zeroMinWidth>
                                        <Stack direction="row" alignItems="flex-end" spacing={2}>
                                            <UserAvatar
                                                userId={props.routineHeader.contributorId}
                                                badge={props.routineHeader.badge}
                                            />
                                            <Typography noWrap variant="h6">
                                                {props.routineHeader.contributor}
                                            </Typography>
                                        </Stack>
                                    </Grid>

                                    <Grid item>
                                        <Grid container direction="row" spacing={3} alignItems="center">
                                            <Grid item>
                                                <FollowButton
                                                    targetUserId={props.routineHeader.contributorId}
                                                />
                                            </Grid>

                                            <Grid item>
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                >
                                                    <FavoriteIcon />

                                                    <Typography
                                                        variant="body1"
                                                    >
                                                        {props.routineHeader.like + myLikeCnt} Like
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item>
                                        <Typography variant="body1">
                                            last updated: {props.routineHeader.lastUpdated}
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Stack direction="row">
                                            <LikeButton
                                                postId={props.id}
                                                contributorId={Number(props.routineHeader.contributorId)}
                                                myLikeCnt={myLikeCnt}
                                                setMyLikeCnt={setMyLikeCnt}
                                            />

                                            <IconButton>
                                                <ShareIcon />
                                            </IconButton>

                                            <FavoriteButton
                                                postId={props.id}
                                                contributorId={Number(props.routineHeader.contributorId)}
                                            />

                                            <MenuButton postId={props.id} />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Paper>
                    </Grid>
                </Grid>
            </Box >
        </Paper >
    );

    const contents = props.routineElementList.map(
        (routineElement: RoutineElement | RoutineElementInput, idx: number) => (
            <Card variant="outlined" sx={{ borderRadius: 2 }} key={idx}>
                <CardContent>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item sx={{ flexGrow: 1 }}>
                            <Card sx={{ borderRadius: 2 }}>
                                <CardHeader
                                    title={
                                        <Typography variant="h5">
                                            {(idx + 1) + ". "}
                                            {routineElement.title}
                                        </Typography>
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

                        <Grid item>
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