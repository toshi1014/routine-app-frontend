import React from 'react';
import {
    TextField,
    Backdrop,
    Stack,
    Chip,
    IconButton,
    Box,
    Typography,
    Button,
    InputBase,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import {
    useNavigate,
} from "react-router-dom";
import {
    RoutinePackContents,
    ChipData,
} from "../utils/Types";
import MyPageBase from "./MyPageBase";
import { ListItem } from "../utils/ListItem";
import {
    getMypageLoginApi,
    updateUserInfoApi,
} from "../api_handlers/handle";
import HashtagLink from "./HashtagLink";
import {
    defaultId,
    defaultUsername,
    defaultStatusMessage,
    defaultHashtagList,
    defaultHashtagAddedList,
    defaultFollowingNum,
    defaultFollowersNum,
    defaultTitle,
    defaultContributor,
    defaultContributorId,
    defaultBadge,
    defaultDesc,
    defaultTitleStep1,
    defaultDescStep1,
    defaultLike,
} from "../utils/defaultValues";
import { Badge } from "../utils/Types";


enum EnumTextFieldLabel {
    Username = "Edit Username",
    StatusMessage = "Edit Status Message",
}


function MyPageLogin() {
    const navigate = useNavigate();

    const [username, setUsername] = React.useState(defaultUsername);
    const [usernameOrgn, setUsernameOrgn] = React.useState(defaultUsername);
    const contributor = usernameOrgn;
    const [badge, setBadge] = React.useState<Badge>(defaultBadge);
    const [statusMessage, setStatusMessage] = React.useState(defaultStatusMessage);
    const [hashtagList, setHashtagList] = React.useState<Array<string>>(defaultHashtagList);
    const [followingNum, setFollowingNum] = React.useState(defaultFollowingNum);
    const [followersNum, setFollowersNum] = React.useState(defaultFollowersNum);
    const [Facebook, setFacebook] = React.useState("");
    const [Twitter, setTwitter] = React.useState("");
    const [Instagram, setInstagram] = React.useState("");

    const [textInputValue, setTextInputValue] = React.useState("");
    const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextInputValue(event.target.value);
    };

    const handleEditUsername = () => {
        setOpenBackdrop(true);
        setTextInputValue(username);
        setTexFieldLabel(EnumTextFieldLabel.Username);
    }
    const handleEditStatusMessage = () => {
        setOpenBackdrop(true);
        setTextInputValue(statusMessage);
        setTexFieldLabel(EnumTextFieldLabel.StatusMessage);
    }

    const [textFieldLabel, setTexFieldLabel] = React.useState("");

    const updateUserInfoWrapper = async (column: string, val: string) => {
        const res = await updateUserInfoApi(column, val);
        if (!res.status) {
            // force logout & redirect to login
            localStorage.removeItem("token");
            navigate("/login");
            window.location.reload();
        }
    }

    const handleChangeClick = async () => {
        if (textFieldLabel === EnumTextFieldLabel.Username) {
            setUsername(textInputValue);
            await updateUserInfoWrapper("username", textInputValue);
            console.log("username changed successfully");
        } else if (textFieldLabel === EnumTextFieldLabel.StatusMessage) {
            setStatusMessage(textInputValue);
            await updateUserInfoWrapper("status_message", textInputValue);
            console.log("statusMessage changed");
        } else {
            throw new Error;
        }
    };

    const usernameEdit = (
        <Typography variant="h4">
            {username}
            <IconButton onClick={handleEditUsername}>
                <EditIcon />
            </IconButton>
        </Typography>
    );

    const statusMessageEdit = (
        <Typography variant="body1">
            {statusMessage}
            <IconButton onClick={handleEditStatusMessage}>
                <EditIcon fontSize="small" />
            </IconButton>
        </Typography>
    );


    // hashtag
    const [hashtagAddedList, setHashtagAddedList] =
        React.useState<Array<ChipData>>(defaultHashtagAddedList);

    const handleAddHashtag = async () => {
        hashtagRef.value = hashtagRef.value.replace(/\s/g, '');
        if (hashtagRef.value !== "") {
            let hashtagAddedListTmp = hashtagAddedList;
            if (hashtagAddedListTmp) {
                hashtagAddedListTmp.push({
                    key: hashtagAddedListTmp.length,
                    label: hashtagRef.value
                });
            } else {
                throw new Error;
            }

            console.log("Hashtag added");

            setHashtagAddedList(hashtagAddedListTmp);
            await updateUserInfoWrapper(
                "hashtag_list",
                hashtagAddedListTmp.map(hashtagAdded => {
                    return hashtagAdded.label
                }).join(",")        // get label & concat with ","
            );
            hashtagRef.value = "";
            update();
        }
    }

    const handleDeleteHashtag = (hashtag2bDeleted: ChipData) => () => {
        setHashtagAddedList((chips) => chips.filter((chip) => chip.key !== hashtag2bDeleted.key));
        console.log("Hashtag removed");
    }

    let hashtagRef = {
        value: ""
    }

    const hashtagChipList = hashtagAddedList.map((hashtagAdded: ChipData) =>
        <ListItem key={hashtagAdded.key}>
            <HashtagLink
                hashtag={hashtagAdded.label}
                onDelete={handleDeleteHashtag(hashtagAdded)}
            />
        </ListItem>
    );

    const hashtagInput = (
        <Chip
            label={
                <Stack direction="row">
                    <Box sx={{ my: -10 }}>
                        <></>
                    </Box>

                    <Box sx={{ my: 5 }}>
                        <p>#</p>
                    </Box>

                    <Box sx={{ my: 5.9, mx: 1 }}>
                        <InputBase
                            sx={{
                                width: 150,
                                maxWidth: "200%"
                            }}
                            fullWidth
                            inputRef={ref => { hashtagRef = ref; }}
                        />
                    </Box>
                    <Box sx={{ my: 5.9 }}>
                        <IconButton size="small" onClick={handleAddHashtag}>
                            <AddIcon />
                        </IconButton>
                    </Box>
                </Stack>
            }
        />
    );
    // end; hashtag

    const [postedList, setPostedList] =
        React.useState<Array<RoutinePackContents>>([
            {
                id: defaultId,
                contributor: defaultContributor,
                contributorId: defaultContributorId,
                badge: defaultBadge,
                title: defaultTitle,
                desc: defaultDesc,
                titleStep1: defaultTitleStep1,
                descStep1: defaultDescStep1,
                like: defaultLike,
            }
        ]);

    const [favoriteList, setFavoriteList] =
        React.useState<Array<RoutinePackContents>>(postedList);

    const [draftList, setDraftList] =
        React.useState<Array<RoutinePackContents>>(postedList);

    const [openBackdrop, setOpenBackdrop] = React.useState(false);
    const [focusTextInput, setFocusTextInput] = React.useState(false);
    const handleCloseBackdrop = () => {
        console.log("backdrop");
        console.log("focus:", focusTextInput);
        if (!focusTextInput) {
            setOpenBackdrop(false);
        } else {
            setOpenBackdrop(true);
        }
        setFocusTextInput(false);
    };
    const onFocusTextInput = () => {
        setFocusTextInput(true);
        console.log("focus");
    };

    // XXX:
    const [foo, setFoo] = React.useState(0);
    const update = () => {
        setFoo(foo + 1);
    };
    React.useEffect(() => {
        if (foo % 2 === 1) {
            update();
        }
    }, [foo]);
    // end; XXX

    React.useEffect(() => {
        const init = async () => {
            const res = await getMypageLoginApi();
            if (res.status) {
                setUsername(res.contents.header.username);
                setUsernameOrgn(res.contents.header.username);
                setBadge(res.contents.header.badge);
                setStatusMessage(res.contents.header.statusMessage);
                setHashtagList(res.contents.header.hashtagList);

                const hashtagAddedListTmp: Array<ChipData> =
                    res.contents.header.hashtagList.map((val: string, idx: number) => {
                        return {
                            key: idx,
                            label: val,
                        }
                    });
                setHashtagAddedList(hashtagAddedListTmp);
                setFollowingNum(res.contents.header.followingNum);
                setFollowersNum(res.contents.header.followersNum);
                setFacebook(res.contents.header.Facebook);
                setTwitter(res.contents.header.Twitter);
                setInstagram(res.contents.header.Instagram);
                setPostedList(res.contents.postedList);
                setFavoriteList(res.contents.favoriteList);
                setDraftList(res.contents.draftList);
                console.log("contents:", res.contents);
            } else {
                console.log("is_authentication failed");

                // force logout & redirect to login
                localStorage.removeItem("token");
                navigate("/login");
                window.location.reload();
            }
        }
        init();
    }, [])


    return (
        <div>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
                open={openBackdrop}
                onClick={handleCloseBackdrop}
            >
                <Stack direction="column" spacing={1}>
                    <TextField
                        variant="outlined"
                        label={textFieldLabel}
                        onChange={handleTextInput}
                        value={textInputValue}
                        onFocus={onFocusTextInput}
                        multiline
                    />
                    <Button variant="outlined" onClick={handleChangeClick}>Change</Button>
                </Stack>
            </Backdrop>

            <MyPageBase
                usernameComp={usernameEdit}
                badge={badge}
                statusMessageComp={statusMessageEdit}
                followingNum={followingNum}
                followersNum={followersNum}
                Facebook={Facebook}
                Twitter={Twitter}
                Instagram={Instagram}
                hashtagList={hashtagList}
                hashtagChipList={hashtagChipList}
                chipInputComp={hashtagInput}
                postedList={postedList}
                favoriteList={favoriteList}
                draftList={draftList}
            />
        </div>
    );
}

export default MyPageLogin;