import React from 'react';
import {
    Paper,
    Grid,
    CardContent,
    Stack,
    Container,
    Chip,
} from "@mui/material";
import ImageSlider from './ImageSlider';
import RoutinePack from './RoutinePack';
import { range } from "../utils/utils";

// TEMP:
const hashtagList = [
    "fishing",
    "hoby",
];
const contributor = "John Smith";
const title = "Happy Coding";
const desc = "Best Way to Create App, set aside off of the heat to let rest for 10 minutes, and then serve.";
const lastUpdated = "2021, Dec 31";
const titleStep1 = "Buy Computer";
const descStep1 = "Choose best computer for you, set aside off of the heat to let rest for 10 minutes, and then serve.";


function Top() {
    const polularHashtagChipList = hashtagList.map((hashtag: string) =>
        <Chip clickable label={"# " + hashtag} />
    );

    const polularRoutineList = range(0, 5).map((idx: number) =>
        <RoutinePack
            contributor={contributor}
            title={title}
            desc={desc}
            lastUpdated={lastUpdated}
            titleStep1={titleStep1}
            descStep1={descStep1}
        />
    );

    return (
        <div>
            <ImageSlider />

            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <Paper>
                        <Container>
                            <h1>Expand Your Routine</h1>
                            <h3>aaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h3>
                        </Container>
                    </Paper>
                </Grid>

                <Grid item>
                    <CardContent>
                        <h2>Polular Hashtags</h2>
                        <Stack direction="row" spacing={1}>
                            {polularHashtagChipList}
                        </Stack>
                    </CardContent>
                </Grid>

                <Grid item>
                    <CardContent>
                        <h2>Polular Routines</h2>
                        <Stack direction="row" spacing={1}>
                            {polularRoutineList}
                        </Stack>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    );
}

export default Top;