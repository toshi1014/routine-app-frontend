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
    Backdrop,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import {
    RoutineHeader,
    RoutineHeaderInput,
    RoutineElement,
    RoutineElementInput,
    IndexedImage,
} from "../utils/Types";
import FollowButton from "./FollowButton";
import UserAvatar from "./UserAvatar";
import LikeButton from "./LikeButton";
import FavoriteButton from "./FavoriteButton";
import MenuButton from "./MenuButton";
import { downloadImageURL } from "../firebase/handler";

type Props = {
    id: number;
    routineHeader: RoutineHeader | RoutineHeaderInput;
    routineElementList: Array<RoutineElement | RoutineElementInput>;
    hashtagChipList: Array<React.ReactElement>;
    uniqueCompHeader?: React.ReactElement;
    uniqueComp?: React.ReactElement;
    imagePicker?: (selectedIdx: number | "theme") => void;
    deleteImage?: (selectedIdx: number | "theme") => void;
    themeImage?: string;
    indexedImageDict?: IndexedImage;
}

function ContentsBase(props: Props) {
    const [myLikeCnt, setMyLikeCnt] = React.useState(0);

    const [imageView, setImageView] = React.useState<any>();

    const [openBackdrop, setOpenBackdrop] = React.useState(false);
    const handleClickImage = (selectedIdx: number | "theme") => {
        // if post or edit, call file picker
        if (props.imagePicker) {
            props.imagePicker(selectedIdx);
        } else {
            setOpenBackdrop(true);

            let targetImgSrc: string;
            if (selectedIdx === "theme") {
                targetImgSrc = themeImageURL;
            } else {
                targetImgSrc = imageURLList[selectedIdx];
            }

            const img = new Image();
            img.src = targetImgSrc;
            const imgComp = (
                img.width > img.height
                    ? <img
                        width="100%"
                        src={targetImgSrc}
                    />
                    : <img
                        height="100%"
                        src={targetImgSrc}
                    />
            )
            setImageView(imgComp);
        }
    }

    const deleteImage = (selectedIdx: number | "theme") => {
        if (props.deleteImage) { props.deleteImage(selectedIdx); }
    }

    const [themeImageURL, setThemeImageURL] = React.useState<string>("");
    const [imageURLList, setImageURLList] = React.useState<Array<string>>([]);
    React.useEffect(() => {
        const init = async () => {
            let imageURLListTmp = [];
            // if draft || edit
            if (props.id === 0) {
            } else {
                // if post, fetch & set image
                setThemeImageURL(await downloadImageURL(`post-${props.id}`));

                for (let elementIdx = 0; elementIdx < props.routineElementList.length; elementIdx++) {
                    // fetch image titles as e.g. post-2-element-1
                    // if not image, imgTmp := "broken"
                    const imgTmp = await downloadImageURL(
                        `post-${props.id}-element-${elementIdx}`
                    );
                    imageURLListTmp.push(imgTmp);
                }
                setImageURLList(imageURLListTmp);
            }
        }
        init();
    }, [])

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
                        <Stack direction="column" spacing={3}>
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

                            <Stack direction="row" spacing={1}>
                                <Button
                                    size="small"
                                    disabled={Boolean(themeImageURL === "broken")}
                                    onClick={() => handleClickImage("theme")}
                                >
                                    Open image
                                </Button>

                                {(props.deleteImage
                                    ?
                                    <Button
                                        size="small"
                                        color="secondary"
                                        onClick={() => deleteImage("theme")}
                                        disabled={!Boolean(
                                            props.themeImage && props.themeImage !== ""
                                        )}
                                    >
                                        Delete image
                                        </Button>
                                    : <div />
                                )}

                                {(props.themeImage && props.themeImage !== ""
                                    ? <img
                                        width="30"
                                        height="30"
                                        src={props.themeImage}
                                        alt="loading..."
                                        onClick={() => handleClickImage("theme")}
                                    />
                                    : <div />
                                )}

                                {(themeImageURL !== "" && themeImageURL !== "broken"
                                    ? <img
                                        width="50"
                                        height="30"
                                        src={themeImageURL}
                                        alt="loading..."
                                        onClick={() => handleClickImage("theme")}
                                    />
                                    : <div />
                                )}
                            </Stack>
                        </Stack>
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
                                    <Stack direction="row" spacing={1}>
                                        <Button
                                            size="small"
                                            onClick={() => handleClickImage(idx)}
                                            disabled={Boolean(imageURLList[idx] === "broken")}
                                        >
                                            Open image
                                    </Button>

                                        {(props.deleteImage
                                            ? <Button
                                                size="small"
                                                color="secondary"
                                                onClick={() => deleteImage(idx)}
                                                disabled={!Boolean(
                                                    props.indexedImageDict && props.indexedImageDict[idx]
                                                )}
                                            >
                                                Delete image
                                            </Button>
                                            : <div />
                                        )}
                                    </Stack>
                                </CardActions>
                            </Card>
                        </Grid>

                        <Grid item sx={{ maxWidth: 200, maxHeight: 300 }}>
                            {(props.id !== 0 && imageURLList[idx] !== "broken"
                                ? <img
                                    src={imageURLList[idx]}
                                    alt="loading..."
                                    onClick={() => handleClickImage(idx)}
                                />
                                : <div />
                            )}

                            {(props.indexedImageDict && props.indexedImageDict[idx]
                                ? <img
                                    src={props.indexedImageDict[idx]}
                                    alt="loading..."
                                    onClick={() => handleClickImage(idx)}
                                />
                                : <div />
                            )}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        ));


    return (
        <div>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
                open={openBackdrop}
                onClick={() => setOpenBackdrop(false)}
            >
                {imageView}
            </Backdrop>

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