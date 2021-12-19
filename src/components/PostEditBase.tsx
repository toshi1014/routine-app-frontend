import React from 'react';
import {
    Chip,
    TextField,
    Stack,
    Fab,
    Grid,
    Box,
    Button,
    IconButton,
    CardContent,
    InputBase,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
    useNavigate,
} from "react-router-dom";
import {
    RoutineHeader,
    RoutineElement,
    RoutineHeaderInput,
    RoutineElementInput,
    RoutineHeaderRef,
    RoutineElementRef,
    ChipData,
} from "../utils/Types";
import ContentsBase from "./ContentsBase";
import { ListItem } from "../utils/ListItem";
import {
    isAuthenticated,
    decodeJwt,
} from "../utils/utils";
import {
    postOrDraftApi,
} from "../api_handlers/handle";


// TEMP:
const defaultUsername = "John Doe";
const defaultLastUpdated = "----, --:--";
const defaultHashtagAddedList: Array<ChipData> = [{ key: 0, label: "ShareYourRoutine" }];

const hashtagList = <h1>None</h1>;  // dummy


type Props = {
    header?: RoutineHeader;
    elementList?: Array<RoutineElement>;
    postId?: number;
}

function PostEditBase(props: Props) {
    const navigate = useNavigate();

    const [username, setUsername] = React.useState(defaultUsername);

    const title = (
        <TextField
            fullWidth
            label="title"
            variant="filled"
            defaultValue={props.header ? props.header.title : null}
            inputRef={ref => { routineHeaderRef.title = ref; }}
        />
    );

    const desc = (
        <TextField
            fullWidth
            multiline
            label="desc"
            variant="standard"
            defaultValue={props.header ? props.header.desc : null}
            inputRef={ref => { routineHeaderRef.desc = ref; }}
        />
    );

    const routineHeaderInput: RoutineHeaderInput = {
        title: title,
        desc: desc,
        hashtagList: hashtagList,
        like: (props.header ? props.header.like : 0),
        contributor: username,
        lastUpdated: (props.header ? props.header.lastUpdated : defaultLastUpdated),
    };

    const routineHeaderRef: RoutineHeaderRef = {
        title: {
            value: ""
        },
        desc: {
            value: ""
        },
    }

    const routineElementRef: RoutineElementRef = {
        title: {
            value: ""
        },
        subtitle: {
            value: ""
        },
        desc: {
            value: ""
        },
    };
    const [routineElementRefList, setRoutineElementRefList] =
        React.useState<Array<RoutineElementRef>>([routineElementRef]);


    const getIndexedRoutineElement = (idx: number) => {
        const routineElement: RoutineElementInput = {
            title: (
                <TextField
                    fullWidth
                    label="title"
                    variant="filled"
                    defaultValue={
                        props.elementList && props.elementList[idx]
                            ? props.elementList[idx].title
                            : null
                    }
                    inputRef={ref => { routineElementRefList[idx].title = ref; }}
                />
            ),

            subtitle: (
                <TextField
                    fullWidth
                    label="subtitle"
                    variant="standard"
                    sx={{ my: 3 }}
                    defaultValue={
                        props.elementList && props.elementList[idx]
                            ? props.elementList[idx].subtitle
                            : null
                    }
                    inputRef={ref => { routineElementRefList[idx].subtitle = ref; }}
                />
            ),

            desc: (
                <TextField
                    fullWidth
                    multiline
                    label="desc"
                    variant="outlined"
                    defaultValue={
                        props.elementList && props.elementList[idx]
                            ? props.elementList[idx].desc
                            : null
                    }
                    inputRef={ref => { routineElementRefList[idx].desc = ref; }}
                />
            ),

            imagePath: "logo192.png",
        };
        return routineElement;
    }
    const [routineElementList, setRoutineElementList] =
        React.useState<Array<RoutineElementInput>>([getIndexedRoutineElement(0)]);

    const handleFavorite = () => {
        console.log("Favorite");
    }

    const handleShare = () => {
        console.log("Share");
    }

    // hashtag
    const [hashtagAddedList, setHashtagAddedList] =
        React.useState<Array<ChipData>>(
            (props.header ?
                props.header.hashtagList.map((hashtag: string, idx: number) => {
                    return { key: idx, label: hashtag }
                })
                : defaultHashtagAddedList
            )
        );

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

            setHashtagAddedList(hashtagAddedListTmp);
            hashtagRef.value = "";
            update();
        }
    }

    const handleDeleteHashtag = (hashtag2bDeleted: ChipData) => () => {
        setHashtagAddedList((chips) => chips.filter((chip) => chip.key !== hashtag2bDeleted.key));
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

    React.useEffect(() => {
        console.log(routineElementList[0].title);
    }, [routineElementList])

    const removeNullFromInput = (routineElementRefList: Array<RoutineElementRef>) => {
        let withoutNull: Array<RoutineElement> = [];

        // remove null input
        for (let r of routineElementRefList) {
            if (r.title === null) {
                continue;
            } else {
                withoutNull.push({
                    title: r.title.value,
                    subtitle: r.subtitle.value,
                    desc: r.desc.value,
                    imagePath: "logo192.png"
                })
            }
        }

        let withoutNullEmpty: Array<RoutineElement> = [];

        // remove emnty input from end
        for (let r of withoutNull.reverse()) {
            if ((r.title + r.subtitle + r.desc) === "") {
                continue;
            } else {
                withoutNullEmpty.push({
                    title: r.title,
                    subtitle: r.subtitle,
                    desc: r.desc,
                    imagePath: "logo192.png"
                })
            }
        }

        return withoutNullEmpty.reverse();
    };

    const postDraftBase = async (strPostOrDraft: string) => {
        const routineElementsInputValue: Array<RoutineElement> = removeNullFromInput(routineElementRefList);
        const res = await postOrDraftApi(
            strPostOrDraft,
            (props.postId ? props.postId : null),
            routineHeaderRef.title.value,
            routineHeaderRef.desc.value,
            hashtagAddedList.map(hashtagAdded => { return hashtagAdded.label }),        // get labels
            routineElementsInputValue,
        );

        if (res.status) {
            navigate("/mypage_login");
        } else {
            // force logout & redirect to login
            localStorage.removeItem("token");
            navigate("/login");
            window.location.reload();
        }

        try {
            console.log("============================")
            console.log("routineHeader")
            console.log("title:", routineHeaderRef.title.value);
            console.log("desc:", routineHeaderRef.desc.value);
            console.log("hashtag:")
            hashtagAddedList.map(hashtag => console.log(hashtag.label));
            console.log("\nroutineElements")

            for (let i = 0; i < routineElementsInputValue.length; i++) {
                const r = routineElementsInputValue[i];
                console.log(i + 1 + ".");
                console.log("title:", r.title);
                console.log("subtitle:", r.subtitle);
                console.log("desc:", r.desc);
            }
        } catch{ }

    }

    const handlePost = async () => {
        await postDraftBase("post");
    };

    const handleDraft = async () => {
        await postDraftBase("draft");
    };


    React.useEffect(() => {
        const init = async () => {
            const boolAuthenated = isAuthenticated();
            const token = localStorage.getItem("token");
            if (!boolAuthenated || !token) {
                // force logout & redirect to login
                localStorage.removeItem("token");
                navigate("/login");
                window.location.reload();
                return null
            }

            setUsername(decodeJwt(token).username);

            if (props.elementList) {
                props.elementList.map((element: RoutineElement, idx: number) => {
                    if (idx !== 0) {    // skip first element, cuz routineElement got init in useState
                        addElement();
                        return getIndexedRoutineElement(0);
                    }
                })
            }
        }
        init();
    }, [])

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
    React.useEffect(() => {
        update();
    }, [routineElementList, routineElementRefList]);
    // end; XXX


    const addElement = () => {
        let routineElementRefListTmp = routineElementRefList;
        const routineElementRefListOrgn = routineElementRefListTmp;
        routineElementRefListTmp.push(routineElementRef);
        setRoutineElementRefList(routineElementRefListTmp);

        let routineElementListTmp = routineElementList;
        const newIdx = routineElementListTmp.length;
        routineElementListTmp.push(getIndexedRoutineElement(newIdx));
        setRoutineElementList(routineElementListTmp);

        setDisabledRemoveIcon(false);
        update();
    }

    const [disabledRemoveIcon, setDisabledRemoveIcon] = React.useState(true);
    const removeElement = () => {
        let routineElementListTmp = routineElementList;
        routineElementListTmp.pop();
        setRoutineElementList(routineElementListTmp);

        const deletedIdx = routineElementListTmp.length;
        if (props.elementList && props.elementList[deletedIdx]) {
            props.elementList[deletedIdx] = {
                title: "",
                subtitle: "",
                desc: "",
                imagePath: "",
            };
            console.log("deleted", deletedIdx);
        }

        // XXX: not working
        // let routineElementRefListTmp = routineElementRefList;
        // routineElementRefListTmp.pop();
        // setRoutineElementRefList(routineElementRefListTmp);

        if (routineElementListTmp.length === 1) {
            setDisabledRemoveIcon(true);
        };
        update();
    }


    const submitButtonsComp = (
        <CardContent>
            <Grid container columns={10}>
                <Grid item xs={8}>
                </Grid>
                <Grid item xs={0.8}>
                    <Fab color="secondary" onClick={removeElement} disabled={disabledRemoveIcon}>
                        <RemoveIcon />
                    </Fab>
                </Grid>
                <Grid item xs={1}>
                    <Fab color="primary" onClick={addElement}>
                        <AddIcon />
                    </Fab>
                </Grid>
            </Grid>

            <Box
                component="div"
                sx={{
                    my: 10,
                }}
            >
            </Box>

            <Stack direction="column" spacing={1}>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handlePost}
                >
                    POST
                </Button>
                <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    type="submit"
                    onClick={handleDraft}
                >
                    SAVE
                </Button>
            </Stack>
        </CardContent>
    );

    return (
        <ContentsBase
            routineHeader={routineHeaderInput}
            routineElementList={routineElementList}
            hashtagChipList={hashtagChipList}
            handleFavorite={handleFavorite}
            handleShare={handleShare}
            uniqueCompHeader={hashtagInput}
            uniqueComp={submitButtonsComp}
        />
    );
}

export default PostEditBase;