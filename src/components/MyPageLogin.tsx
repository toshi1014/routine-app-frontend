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
    RoutinePackContents,
    MenuChildProps,
    ChipData,
} from "../utils/Types";
import MyPageBase from "./MyPageBase";
import { ListItem } from "../utils/ListItem";


// TEMP:
const hashtagList = [
    "fishing",
    "hobby",
    "cooking",
    "DIY",
    "English",
    "workout",
];
const usernameOrgn = "John Smith";
const contributor = usernameOrgn;
const hashtagListOrgn: Array<ChipData> = hashtagList.map((val: string, idx: number) => {
    return {
        key: idx,
        label: val,
    }
});
const title = "Happy Coding";
const desc = "Best Way to Create App, set aside off of the heat to let rest for 10 minutes, and then serve.";
const lastUpdated = "2021, Dec 31";
const titleStep1 = "Buy Computer";
const descStep1 = "Choose best computer for you, set aside off of the heat to let rest for 10 minutes, and then serve.";
const statusMessageOrgn = "G'day!";
const followersNum = 10;
const followingNum = 10;


enum EnumTextFieldLabel {
    Username = "Edit Username",
    StatusMessage = "Edit Status Message",
}

function MyPageLogin() {
    const [username, setUsername] = React.useState(usernameOrgn);
    const [statusMessage, setStatusMessage] = React.useState(statusMessageOrgn);

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

    const handleChangeClick = () => {
        if (textFieldLabel === EnumTextFieldLabel.Username) {
            setUsername(textInputValue);
            console.log("username changed");
        } else if (textFieldLabel === EnumTextFieldLabel.StatusMessage) {
            setStatusMessage(textInputValue);
            console.log("statusMessage changed");
        } else {
            throw new Error;
        }
    };

    const usernameEdit = (
        <h1>
            {username}
            <IconButton onClick={handleEditUsername}>
                <EditIcon />
            </IconButton>
        </h1>
    );

    const statusMessageEdit = (
        <Typography paragraph>{statusMessage}
            <IconButton onClick={handleEditStatusMessage}>
                <EditIcon fontSize="small" />
            </IconButton>
        </Typography>
    );


    // hashtag
    const [hashtagAddedList, setHashtagAddedList] =
        React.useState<Array<ChipData>>(hashtagListOrgn);

    const handleAddHashtag = () => {
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
            <Chip
                label={"# " + hashtagAdded.label}
                onDelete={handleDeleteHashtag(hashtagAdded)}
                key={hashtagAdded.key}
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

    const postedList: Array<RoutinePackContents> = [
        {
            contributor: contributor,
            title: title,
            desc: desc,
            lastUpdated: lastUpdated,
            titleStep1: titleStep1,
            descStep1: descStep1,
        },
        {
            contributor: contributor,
            title: title,
            desc: desc,
            lastUpdated: lastUpdated,
            titleStep1: titleStep1,
            descStep1: descStep1,
        },
    ];
    const faboriteList = postedList;
    const draftList = postedList;

    // Menu
    const [searchBoxValue, setSearchBoxValue] = React.useState("");
    const handleSearchBox = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const input = event.target.value;
        setSearchBoxValue(input);
    }
    const menuChildProps: MenuChildProps = {
        searchBoxValue: searchBoxValue,
        setSearchBoxValue: setSearchBoxValue,
        handleSearchBox: handleSearchBox,
    }
    // end; Menu

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
                statusMessageComp={statusMessageEdit}
                followingNum={followingNum}
                followersNum={followersNum}
                hashtagList={hashtagList}
                hashtagChipList={hashtagChipList}
                chipInputComp={hashtagInput}
                postedList={postedList}
                faboriteList={faboriteList}
                draftList={draftList}
                menuChildProps={menuChildProps}
            />
        </div>
    );
}

export default MyPageLogin;