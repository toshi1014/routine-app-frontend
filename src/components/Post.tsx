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
import { RoutineHeaderInput, RoutineElementInput } from "../utils/Types";
import { RoutineHeader, RoutineElement } from "../utils/Types";
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

    const routineHeaderRef = {
        title: {
            value: ""
        },
        desc: {
            value: ""
        },
    }

    const routineElementRef = {
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
    const routineElementRefList = [routineElementRef];

    const routineElement: RoutineElementInput = {
        title: (
            <TextField
                fullWidth
                label="title"
                variant="filled"
                inputRef={ref => { routineElementRefList[0].title = ref; }}
            />
        ),

        subtitle: (
            <TextField
                fullWidth
                label="subtitle"
                variant="standard"
                sx={{ my: 3 }}
                inputRef={ref => { routineElementRefList[0].subtitle = ref; }}
            />
        ),

        desc: (
            <TextField
                fullWidth
                multiline
                label="desc"
                variant="outlined"
                inputRef={ref => { routineElementRefList[0].desc = ref; }}
            />
        ),

        imagePath: "logo192.png",
    };
    const [routineElementList, setRoutineElementList] =
        React.useState<Array<RoutineElementInput>>([routineElement]);

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

    const handlePost = () => {
        console.log("title", routineHeaderRef.title.value);
        console.log("desc", routineHeaderRef.desc.value);
        routineElementRefList.map((val: any) => {
            console.log("title", val.title.value);
            console.log("subtitle", val.subtitle.value);
            console.log("desc", val.desc.value);
        })
    };

    const addElement = () => {
        const routineElementListTmp = routineElementList;
        routineElementListTmp.push(routineElement);
        setRoutineElementList(routineElementListTmp);
        routineElementRefList.push(routineElementRef);
        console.log(routineElementList.length);
    }


    const submitButtonsComp = (
        <CardContent>
            <Grid container columns={10}>
                <Grid item xs={9}>
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