import React from 'react';
import {
    Grid,
    Button,
    CardContent,
    Box,
    Container,
    Typography,
    Paper,
    Backdrop,
    Stack,
    AccordionSummary,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import SearchBox from './SearchBox';
import RoutinePack from './RoutinePack';
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { useNavigate } from "react-router-dom";
import { useFilePicker } from "use-file-picker";
import {
    RoutinePackContents,
    Badge,
} from "../utils/Types";
import { defaultId } from "../utils/defaultValues";
import FollowButton from "./FollowButton";
import { deleteApi } from "../api_handlers/handle";
import FollowList from "./FollowList";
import { decodeJwt } from "../utils/utils";
import UserAvatar from "./UserAvatar";
import SNSLink from "./SNSLink";
import EditAvatar from "./EditAvatar";
import CircularProgressWithText from "./CircularProgressWithText";

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    '&:not(:last-child)': {
        borderBottom: 3,
    },
    '&:before': {
        display: 'none',
    },
}));

const menuContentList = [
    "All",
    "Fabs",
    "Posted",
    "Liked",
];


type Props = {
    usernameComp: React.ReactElement;
    badge: Badge;
    statusMessageComp: React.ReactElement;
    followingNum: number;
    followersNum: number;
    Facebook: string;
    Twitter: string;
    Instagram: string;
    hashtagList: Array<string>;
    hashtagChipList: Array<React.ReactElement>;
    chipInputComp?: React.ReactElement;
    postedList: Array<RoutinePackContents>;
    favoriteList: Array<RoutinePackContents>;
    draftList?: Array<RoutinePackContents>;
}


function MyPageBase(props: Props) {
    const navigate = useNavigate();
    const AVATAR_SIZE = 70;

    const [targetUserId, setTargetUserId] = React.useState(defaultId);

    // force avatar change without reloading, when page got changed
    React.useEffect(() => {
        const token = localStorage.getItem("token")
        const userIdFromToken = (token === null) ? null : decodeJwt(token).id;

        const href = window.location.href;
        const splitHref = href.split('/');
        const splitHrefLength = splitHref.length;
        const userIdFromUrl = Number(splitHref[splitHrefLength - 1]);

        if (isNaN(userIdFromUrl)) {
            setTargetUserId(userIdFromToken);
        } else {
            setTargetUserId(userIdFromUrl);
        }
    }, [props.usernameComp])

    const handleClickEdit = (strPostOrDraft: string, id: number) => {
        navigate("edit/" + strPostOrDraft + "/" + id);
    }

    const [openCircularProgress, setOpenCircularProgress] = React.useState(false);

    const handleClickDelete = async (strPostOrDraft: string, id: number) => {
        setOpenCircularProgress(true);
        const res = await deleteApi(strPostOrDraft, id);
        setOpenCircularProgress(false);

        if (!res.status) {
            // force logout & redirect to login
            localStorage.removeItem("token");
            navigate("/login");
        }
        window.location.reload();
    }

    const [myFollowCnt, setMyFollowCnt] = React.useState(0);

    const postedListComp = props.postedList.map((posted, idx: number) =>
        <Grid item key={idx}>
            <RoutinePack
                id={posted.id}
                contributor={posted.contributor}
                contributorId={posted.contributorId}
                badge={posted.badge}
                title={posted.title}
                desc={posted.desc}
                titleStep1={posted.titleStep1}
                descStep1={posted.descStep1}
                like={posted.like}
                editable={Boolean(props.chipInputComp)}
                handleClickEdit={
                    () => handleClickEdit("post", posted.id)
                }
                handleClickDelete={
                    () => handleClickDelete("post", posted.id)
                }
            />
        </Grid>
    );

    const favoriteListComp = props.favoriteList.map((favorite, idx: number) =>
        <Grid item key={idx}>
            <RoutinePack
                id={favorite.id}
                contributor={favorite.contributor}
                contributorId={favorite.contributorId}
                badge={favorite.badge}
                title={favorite.title}
                desc={favorite.desc}
                titleStep1={favorite.titleStep1}
                descStep1={favorite.descStep1}
                like={favorite.like}
            />
        </Grid>
    );

    const [followListTitle, setFollowListTitle] = React.useState("FollowList");
    const [openFollowList, setOpenFollwList] = React.useState(false);
    const handleCloseFollowList = () => {
        setOpenFollwList(false);
    }
    const handleClickFollow = (followingOrFollowers: string) => {
        if (followingOrFollowers === "following") {
            setOpenFollwList(true);
            setFollowListTitle("Following");
        } else if (followingOrFollowers === "followers") {
            setOpenFollwList(true);
            setFollowListTitle("Followers");
        } else {
            throw new Error("unknown followingOrFollowers " + followingOrFollowers);
        }
    }

    // edit Avatar
    const [openFileSelector, { filesContent, loading, clear }] = useFilePicker({
        readAs: 'DataURL',
        accept: "image/*",
        multiple: false,
        limitFilesConfig: { max: 1 },
        maxFileSize: 50,
    });

    const header = (
        <Paper sx={{ my: 1 }}>
            <Container>
                <CardContent>
                    <Grid container direction="column" spacing={2}>

                        <Grid item>
                            <Stack direction="row" spacing={3} alignItems="flex-end">
                                <UserAvatar
                                    userId={targetUserId}
                                    badge={props.badge}
                                    size={AVATAR_SIZE}
                                    openFileSelector={(
                                        props.chipInputComp ?
                                            openFileSelector
                                            : undefined
                                    )}
                                />
                                <div>{props.usernameComp}</div>
                            </Stack>
                        </Grid>

                        <Grid item sx={{ mt: 1 }}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <ChatBubbleOutlineIcon />
                                {props.statusMessageComp}
                            </Stack>
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
                            {props.chipInputComp}
                        </Grid>

                        <Grid item>
                            <Grid container alignItems="center" direction="row" spacing={3}>
                                <Grid item>
                                    <FollowButton
                                        targetUserId={targetUserId}
                                        disabled={Boolean(props.draftList)}
                                        myFollowCnt={myFollowCnt}
                                        setMyFollowCnt={setMyFollowCnt}
                                    />
                                </Grid>
                                <Grid item>
                                    <FollowList
                                        open={openFollowList}
                                        userId={targetUserId}
                                        title={followListTitle}
                                        onClose={handleCloseFollowList}
                                    />

                                    Following
                                    <Button
                                        variant="text"
                                        size="small"
                                        disabled={props.followingNum === 0 ? true : false}
                                        onClick={() => handleClickFollow("following")}
                                    >
                                        {props.followingNum}
                                    </Button>

                                    Followers
                                        <Button
                                        variant="text"
                                        size="small"
                                        disabled={(props.followersNum + myFollowCnt) === 0 ? true : false}
                                        onClick={() => handleClickFollow("followers")}
                                    >
                                        {props.followersNum + myFollowCnt}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Stack direction="row" spacing={2}>
                                <SNSLink
                                    medium="Facebook"
                                    editable={Boolean(props.chipInputComp)}
                                    link={props.Facebook}
                                />
                                <SNSLink
                                    medium="Twitter"
                                    editable={Boolean(props.chipInputComp)}
                                    link={props.Twitter}
                                />
                                <SNSLink
                                    medium="Instagram"
                                    editable={Boolean(props.chipInputComp)}
                                    link={props.Instagram}
                                />
                            </Stack>
                        </Grid>

                    </Grid>
                </CardContent>
            </Container>
        </Paper>
    );

    return (
        <div>
            <CircularProgressWithText
                open={openCircularProgress}
                whatURwating4="Deleting"
            />

            {header}

            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
                open={Boolean(filesContent.length === 1)}
            >
                <EditAvatar
                    userId={targetUserId}
                    filesContent={filesContent}
                    clear={clear}
                />
            </Backdrop>

            <Grid container direction="column">
                <Grid item>
                    <CardContent>
                        <SearchBox
                            defaultValue=""
                            defaultTarget=""
                            menuContentList={menuContentList}
                        />
                    </CardContent>
                </Grid>

                <CardContent>
                    <Accordion>
                        <Paper variant="outlined" sx={{ mb: 2 }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h5">Posted</Typography>
                            </AccordionSummary>
                        </Paper>

                        {props.postedList.length == 0
                            ? <Typography variant="body1">no posts yet</Typography>
                            : <Grid container direction="row" spacing={1}>
                                {postedListComp}
                            </Grid>
                        }
                    </Accordion>
                </CardContent>

                <CardContent>
                    <Accordion>
                        <Paper variant="outlined" sx={{ mb: 2 }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Stack direction="row" alignItems="flex-start">
                                    <Typography variant="h5">
                                        Favorites
                                </Typography>

                                    <BookmarkIcon />
                                </Stack>
                            </AccordionSummary>
                        </Paper>

                        <CardContent sx={{ mt: -2 }}>
                            {props.favoriteList.length == 0
                                ? <Typography variant="body1">no favorites yet</Typography>
                                : <Grid container direction="row" spacing={1}>
                                    {favoriteListComp}
                                </Grid>
                            }
                        </CardContent>
                    </Accordion>
                </CardContent>

                {
                    (props.draftList && props.draftList.length !== 0)
                        ? <CardContent>
                            <Typography variant="h5">Drafts</Typography>
                            <Grid container direction="row" spacing={1}>
                                {props.draftList.map((draft, idx: number) =>
                                    <Grid item key={idx}>
                                        <RoutinePack
                                            id={draft.id}
                                            contributor={draft.contributor}
                                            contributorId={draft.contributorId}
                                            badge={draft.badge}
                                            title={draft.title}
                                            desc={draft.desc}
                                            titleStep1={draft.titleStep1}
                                            descStep1={draft.descStep1}
                                            like={draft.like}
                                            editable={Boolean(props.chipInputComp)}
                                            handleClickEdit={
                                                () => handleClickEdit("draft", draft.id)
                                            }
                                            handleClickDelete={
                                                () => handleClickDelete("draft", draft.id)
                                            }
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </CardContent>
                        : <div></div>
                }
            </Grid>
        </div >
    );
}

export default MyPageBase;