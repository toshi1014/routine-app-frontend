import React from 'react';
import {
    Chip,
    TextField,
    Stack,
    Fab,
    Grid,
    Box,
    Button,
    CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
    RoutineElement,
    RoutineHeaderInput,
    RoutineElementInput,
    RoutineHeaderRef,
    RoutineElementRef,
} from "../utils/Types";
import ContentsBase from "./ContentsBase";


// TEMP:
const username = "John Smith";

const like = 0;
const contributor = username;
const lastUpdated = "----, -- --";
const hashtagList = <h1>b</h1>;


function Post() {
    const title = (
        <TextField
            fullWidth
            label="title"
            variant="filled"
            inputRef={ref => { routineHeaderRef.title = ref; }}
        />
    );

    const desc = (
        <TextField
            fullWidth
            multiline
            label="desc"
            variant="standard"
            inputRef={ref => { routineHeaderRef.desc = ref; }}
        />
    );

    const routineHeaderInput: RoutineHeaderInput = {
        title: title,
        desc: desc,
        hashtagList: hashtagList,
        like: like,
        contributor: contributor,
        lastUpdated: lastUpdated,
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
                    inputRef={ref => { routineElementRefList[idx].title = ref; }}
                />
            ),

            subtitle: (
                <TextField
                    fullWidth
                    label="subtitle"
                    variant="standard"
                    sx={{ my: 3 }}
                    inputRef={ref => { routineElementRefList[idx].subtitle = ref; }}
                />
            ),

            desc: (
                <TextField
                    fullWidth
                    multiline
                    label="desc"
                    variant="outlined"
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

    // const hashtagChipList = hashtagList.map((hashtag: string) =>
    //     <Chip clickable label={"# " + hashtag} />
    // );

    // React.useEffect(() => {
    //     console.log(routineElementList[0].title);
    // }, [routineElementList])

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

    const handlePost = () => {
        const routineElementsInputValue:Array<RoutineElement> = removeNullFromInput(routineElementRefList);

        console.log("============================")
        console.log("routineHeader")
        console.log("title:", routineHeaderRef.title.value);
        console.log("desc:", routineHeaderRef.desc.value);
        console.log("\nroutineElements")

        for (let i=0; i < routineElementsInputValue.length; i++) {
            const r = routineElementsInputValue[i];
            console.log(i+1 + ".");
            console.log("title:", r.title);
            console.log("subtitle:", r.subtitle);
            console.log("desc:", r.desc);
        }
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
        console.log(newIdx);
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
                    onClick={handlePost}
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
            hashtagChipList="aaa"
            handleFavorite={handleFavorite}
            handleShare={handleShare}
            uniqueComp={submitButtonsComp}
        />
    );
}

export default Post;
