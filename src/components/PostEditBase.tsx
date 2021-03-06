import React from 'react';
import {
    Chip,
    TextField,
    Stack,
    Fab,
    Button,
    IconButton,
    CardContent,
    InputBase,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import { useFilePicker } from "use-file-picker";
import {
    RoutineHeader,
    RoutineElement,
    RoutineHeaderInput,
    RoutineElementInput,
    RoutineHeaderRef,
    RoutineElementRef,
    ChipData,
    IndexedImage,
} from "../utils/Types";
import ContentsBase from "./ContentsBase";
import { ListItem } from "../utils/ListItem";
import {
    isAuthenticated,
    decodeJwt,
} from "../utils/utils";
import { Badge } from "../utils/Types";
import { postOrDraftApi } from "../api_handlers/handle";
import {
    defaultUsername,
    defaultId as defaultUserId,
    defaultHashtagAddedList,
    defaultLastUpdated,
    defaultBadge,
} from "../utils/defaultValues";
import { uploadDataURLImage } from "../firebase/handler";
import CircularProgressWithText from "./CircularProgressWithText";
import { basicValidation } from "../utils/validations";
import { maxInputLength } from "../config";

const hashtagList = <h1>None</h1>;  // dummy


type Props = {
    header?: RoutineHeader;
    elementList?: Array<RoutineElement>;
    postId?: number;
    boolEditedDraft?: boolean;
}

function PostEditBase(props: Props) {
    const navigate = useNavigate();

    const [username, setUsername] = React.useState(defaultUsername);
    const [userId, setUserId] = React.useState(defaultUserId);
    const [badge, setBadge] = React.useState<Badge>(defaultBadge);

    const [helperTextTitle, setHelperTextTitle] = React.useState("");
    const [helperTextDesc, setHelperTextDesc] = React.useState("");

    const title = (
        <TextField
            fullWidth
            label="title"
            variant="filled"
            defaultValue={props.header ? props.header.title : null}
            inputRef={ref => { routineHeaderRef.title = ref; }}
            error={Boolean(helperTextTitle !== "")}
            helperText={helperTextTitle}
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
            error={Boolean(helperTextDesc !== "")}
            helperText={helperTextDesc}
        />
    );

    const routineHeaderInput: RoutineHeaderInput = {
        title: title,
        desc: desc,
        hashtagList: hashtagList,
        like: (props.header ? props.header.like : 0),
        contributor: username,
        contributorId: userId,
        badge: badge,
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


    const helperTextElement = {
        title: "",
        subtitle: "",
        desc: "",
    };
    const [helperTextElementList, setHelperTextElementList] = React.useState(
        [helperTextElement]
    );

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
                    error={Boolean(helperTextElementList[idx].title !== "")}
                    helperText={helperTextElementList[idx].title}
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
                    error={Boolean(helperTextElementList[idx].subtitle !== "")}
                    helperText={helperTextElementList[idx].subtitle}
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
                    error={Boolean(helperTextElementList[idx].desc !== "")}
                    helperText={helperTextElementList[idx].desc}
                />
            ),
        };
        return routineElement;
    }
    const [routineElementList, setRoutineElementList] =
        React.useState<Array<RoutineElementInput>>([getIndexedRoutineElement(0)]);

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
                <Stack direction="row" spacing={1} alignItems="center">
                    <p>#</p>
                    <InputBase
                        sx={{
                            width: 150,
                            maxWidth: "200%"
                        }}
                        fullWidth
                        inputRef={ref => { hashtagRef = ref; }}
                    />
                    <IconButton size="small" onClick={handleAddHashtag}>
                        <AddIcon />
                    </IconButton>
                </Stack >
            }
            sx={{ mb: 3 }}
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
                })
            }
        }

        return withoutNullEmpty.reverse();
    };

    const [openCircularProgress, setOpenCircularProgress] = React.useState(false);

    // check whether valid
    // if not, show error & helperText
    const isValidPost = (
        routineHeaderRef: RoutineHeaderRef,
        routineElementsInputValue: Array<RoutineElement>
    ) => {
        let concatedHelperText = "";

        const helperTextTitleTmp = basicValidation(
            routineHeaderRef.title.value,
            maxInputLength.postTitle
        );
        setHelperTextTitle(helperTextTitleTmp);
        concatedHelperText += helperTextTitleTmp;

        const helperTextDescTmp = basicValidation(
            routineHeaderRef.desc.value,
            maxInputLength.postDesc
        );
        setHelperTextDesc(helperTextDescTmp);
        concatedHelperText += helperTextDescTmp;

        let helperTextElementListTmp = [];
        for (let idx = 0; idx < routineElementsInputValue.length; idx++) {
            const routineElementsInput = routineElementsInputValue[idx];
            const helperTextElemTitleTmp = basicValidation(
                routineElementsInput.title,
                maxInputLength.elementTitle,
            );
            const helperTextElemSubtitleTmp = basicValidation(
                routineElementsInput.subtitle,
                maxInputLength.elementSubtitle,
            );
            const helperTextElemDescTmp = basicValidation(
                routineElementsInput.desc,
                maxInputLength.elementDesc,
            );

            helperTextElementListTmp.push(
                {
                    title: helperTextElemTitleTmp,
                    subtitle: helperTextElemSubtitleTmp,
                    desc: helperTextElemDescTmp,
                }
            )

            concatedHelperText += helperTextElemTitleTmp +
                helperTextElemSubtitleTmp + helperTextElemDescTmp;
        }

        // XXX: not working
        setHelperTextElementList(helperTextElementListTmp);

        return Boolean(concatedHelperText === "");
    }

    const postDraftBase = async (strPostOrDraft: string) => {
        const routineElementsInputValue: Array<RoutineElement> = removeNullFromInput(routineElementRefList);

        const boolValidPost = isValidPost(routineHeaderRef, routineElementsInputValue);

        console.log("helperText:", helperTextElementList);

        if (boolValidPost) {
            setOpenCircularProgress(true);

            const res = await postOrDraftApi(
                strPostOrDraft,
                (props.postId ? props.postId : null),
                (props.boolEditedDraft ? props.boolEditedDraft : false),
                routineHeaderRef.title.value,
                routineHeaderRef.desc.value,
                hashtagAddedList.map(hashtagAdded => { return hashtagAdded.label }),        // get labels
                routineElementsInputValue,
            );

            if (res.status) {
                const postId = res.contents.postId;

                if (themeImage !== "") {
                    await uploadDataURLImage(themeImage, `post-${postId}`);
                }

                for (let key of Object.keys(indexedImageDict)) {
                    await uploadDataURLImage(
                        indexedImageDict[Number(key)],
                        `post-${postId}-element-${key}`
                    );
                }

                setOpenCircularProgress(false);
                navigate("/mypage_login");
            } else {
                // force logout & redirect to login
                localStorage.removeItem("token");
                navigate("/login");
                window.location.reload();
            }
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

    // image
    const [openFileSelector, { filesContent, loading, clear }] = useFilePicker({
        readAs: 'DataURL',
        accept: "image/*",
        multiple: false,
        limitFilesConfig: { max: 1 },
        maxFileSize: 50,
    });

    const [themeImage, setThemeImage] = React.useState<string>("");
    const [indexedImageDict, setIndexedImageDict] = React.useState<IndexedImage>([]);
    const [selectedImageIdx, setSelectedImageIdx] = React.useState<number | "theme">(0);

    const imagePicker = (selectedIdx: number | "theme") => {
        openFileSelector();
        setSelectedImageIdx(selectedIdx);
    }

    const deleteImage = (selectedIdx: number | "theme") => {
        if (selectedIdx === "theme") {
            setThemeImage("");
        } else {
            let indexedImageListTmp: IndexedImage = [];
            for (let key of Object.keys(indexedImageDict)) {
                if (Number(key) !== selectedIdx) {
                    indexedImageDict[Number(key)] = indexedImageDict[Number(key)];
                }
            }
            setIndexedImageDict(indexedImageListTmp);
        }
    }

    React.useEffect(() => {
        if (filesContent.length !== 0) {
            if (selectedImageIdx === "theme") {
                setThemeImage(filesContent[0].content);
            } else {
                let indexedImageListTmp = indexedImageDict;
                indexedImageDict[selectedImageIdx] = filesContent[0].content;
                setIndexedImageDict(indexedImageListTmp);
            }
        }
    }, [filesContent])


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
            setUserId(decodeJwt(token).id);
            setBadge(decodeJwt(token).badge);

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
        routineElementRefListTmp.push(routineElementRef);
        setRoutineElementRefList(routineElementRefListTmp);

        let helperTextElementListTmp = helperTextElementList;
        helperTextElementListTmp.push(helperTextElement);
        setHelperTextElementList(helperTextElementListTmp);

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
            <Stack spacing={3} direction="row" justifyContent="flex-end">
                <Fab color="secondary" onClick={removeElement} disabled={disabledRemoveIcon}>
                    <RemoveIcon />
                </Fab>
                <Fab color="primary" onClick={addElement}>
                    <AddIcon />
                </Fab>
            </Stack>

            <Stack direction="column" spacing={1} sx={{ mt: 10 }}>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={async () => await postDraftBase("post")}
                >
                    POST
                </Button>
                <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    type="submit"
                    onClick={async () => await postDraftBase("draft")}
                >
                    SAVE
                </Button>
            </Stack>
        </CardContent>
    );

    return (
        <div>
            <CircularProgressWithText
                open={openCircularProgress}
                whatURwating4="Posting"
            />

            <ContentsBase
                id={(props.postId ? props.postId : 0)}
                routineHeader={routineHeaderInput}
                routineElementList={routineElementList}
                hashtagChipList={hashtagChipList}
                uniqueCompHeader={hashtagInput}
                uniqueComp={submitButtonsComp}
                imagePicker={imagePicker}
                deleteImage={deleteImage}
                themeImage={themeImage}
                indexedImageDict={indexedImageDict}
            />
        </div>
    );
}

export default PostEditBase;