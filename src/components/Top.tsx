import React from 'react';
import {
    Paper,
    Grid,
    CardContent,
    Container,
    Box,
    Chip,
} from "@mui/material";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import ImageSlider from './ImageSlider';
import RoutinePack from './RoutinePack';
import SearchBox from './SearchBox';
import { range } from "../utils/utils";
import useWindowSize from "../utils/useWindowSize";
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
const contributor = "John Smith";
const title = "Happy Coding";
const desc = "Best Way to Create App, set aside off of the heat to let rest for 10 minutes, and then serve.";
const lastUpdated = "2021, Dec 31";
const titleStep1 = "Buy Computer";
const descStep1 = "Choose best computer for you, set aside off of the heat to let rest for 10 minutes, and then serve.";
const like = 10;

const menuContentList = [
    "All",
    "Trend",
    "Popular",
];


function Top() {
    const [innerWidth, innerHeight] = useWindowSize();

    const polularHashtagChipList = hashtagList.map((hashtag: string, idx: number) =>
        <ListItem key={idx}>
            <Chip clickable label={"# " + hashtag} key={idx} />
        </ListItem>
    );

    const polularRoutineList = range(0, 5).map((idx: number) =>
        <RoutinePack
            id={0}
            contributor={contributor}
            title={title + idx}
            desc={desc}
            titleStep1={titleStep1}
            descStep1={descStep1}
            like={like}
            key={idx}
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
                        <h1>Find Routines</h1>
                        <SearchBox
                            defaultValue=""
                            defaultTarget=""
                            menuContentList={menuContentList}
                        />
                    </CardContent>
                </Grid>

                <Grid item>
                    <CardContent>
                        <h2>Polular Hashtags</h2>
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
                            {polularHashtagChipList}
                        </Box>
                    </CardContent>
                </Grid>

                <Grid item>
                    <CardContent>
                        <h2>Polular Routines</h2>
                    </CardContent>
                </Grid>
            </Grid>

            <div>
                <AliceCarousel
                    mouseTracking
                    items={polularRoutineList}
                    autoPlay={false}
                    animationDuration={400}
                    disableButtonsControls={true}
                    disableDotsControls={true}
                    paddingLeft={50}
                    paddingRight={innerWidth - 450}
                />
            </div>
        </div>
    );
}

export default Top;