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
const menuContentList = hashtagList;
const contributor = "John Smith";
const title = "Happy Coding";
const desc = "Best Way to Create App, set aside off of the heat to let rest for 10 minutes, and then serve.";
const lastUpdated = "2021, Dec 31";
const titleStep1 = "Buy Computer";
const descStep1 = "Choose best computer for you, set aside off of the heat to let rest for 10 minutes, and then serve.";


function Top() {
    const [innerWidth, innerHeight] = useWindowSize();
    const [searchBoxValue, setSearchBoxValue] = React.useState("");

    const polularHashtagChipList = hashtagList.map((hashtag: string, idx: number) =>
        <ListItem key={idx}>
            <Chip clickable label={"# " + hashtag} key={idx} />
        </ListItem>
    );

    const polularRoutineList = range(0, 5).map((idx: number) =>
        <RoutinePack
            contributor={contributor}
            title={title + idx}
            desc={desc}
            titleStep1={titleStep1}
            descStep1={descStep1}
            key={idx}
        />
    );

    const handleSearchBox = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const input = event.target.value;
        setSearchBoxValue(input);
    }

    // Menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleMenuClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setAnchorEl(event.currentTarget);
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
    }
    const handleMenuContentClick = (
        event: React.MouseEvent<HTMLElement>,
        idx: number
    ) => {
        setSearchBoxValue(menuContentList[idx]);
        handleMenuClose();
    }
    // end; Menu


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
                            anchorEl={anchorEl}
                            searchBoxValue={searchBoxValue}
                            onChange={handleSearchBox}
                            menuContents={menuContentList}
                            handleMenuClick={handleMenuClick}
                            handleMenuClose={handleMenuClose}
                            handleMenuContentClick={handleMenuContentClick}
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