import React from 'react';
import {
    Paper,
    Grid,
    CardContent,
    Box,
} from "@mui/material";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import ImageSlider from './ImageSlider';
import RoutinePack from './RoutinePack';
import SearchBox from './SearchBox';
import { range } from "../utils/utils";
import useWindowSize from "../utils/useWindowSize";
import { ListItem } from "../utils/ListItem";
import HashtagLink from "./HashtagLink";
import {
    defaultTitle,
    defaultContributor,
    defaultContributorId,
    defaultBadge,
    defaultDesc,
    defaultTitleStep1,
    defaultDescStep1,
    defaultLike,
    defaultHashtagList,
} from "../utils/defaultValues";
import {
    Badge,
} from "../utils/Types";


// TEMP:
const badgeList: Array<Badge> = ["noBadge", "l1", "l2", "l3"];

const menuContentList = [
    "All",
    "Trend",
    "Popular",
    "Hashtag",
];


function Top() {
    const [innerWidth, innerHeight] = useWindowSize();

    const xxxWidth = 450;

    const polularHashtagChipList = defaultHashtagList.map((hashtag: string, idx: number) =>
        <ListItem key={idx}>
            <HashtagLink
                hashtag={hashtag}
                key={idx}
            />
        </ListItem>
    );

    const polularRoutineList = range(0, 10).map((idx: number) =>
        <RoutinePack
            id={0}
            contributor={defaultContributor}
            contributorId={defaultContributorId}
            badge={badgeList[idx % badgeList.length]}
            title={defaultTitle + idx}
            desc={defaultDesc}
            titleStep1={defaultTitleStep1}
            descStep1={defaultDescStep1}
            like={defaultLike}
            key={idx}
        />
    );


    return (
        <div>
            <ImageSlider />

            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <Paper>
                        <CardContent>
                            <h1>Expand Your Routine</h1>
                            <h3>aaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h3>
                        </CardContent>
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
                    paddingLeft={(innerWidth > xxxWidth ? 50 : 10)}
                    paddingRight={Math.max(innerWidth - xxxWidth, 15)}
                />
            </div>
        </div>
    );
}

export default Top;