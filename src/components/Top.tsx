import React from 'react';
import {
    Paper,
    Card,
    Grid,
    CardContent,
    Stack,
    Container,
    Chip,
} from "@mui/material";
import ImageSlider from './ImageSlider';

// TEMP:
const hashtagList = [
    "fishing",
    "hoby",
];


function Top() {
    const polularHashtagChipList = hashtagList.map((hashtag: string) =>
        <Chip clickable label={"# " + hashtag} />
    );

    const polularRoutineList = hashtagList.map((hashtag: string) =>
        <Chip clickable label={"# " + hashtag} />
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