import React from 'react';
import {
    Grid,
    CardContent,
} from "@mui/material";
import SearchBox from './SearchBox';
import RoutinePack from './RoutinePack';
import { range } from "../utils/utils";


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


function SearchResults() {
    const [searchBoxValue, setSearchBoxValue] = React.useState("");

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

    const resultList = range(0, 5).map((idx: number) =>
        <Grid item>
            <RoutinePack
                contributor={contributor}
                title={title + idx}
                desc={desc}
                lastUpdated={lastUpdated}
                titleStep1={titleStep1}
                descStep1={descStep1}
            />
        </Grid>
    );

    return (
        <div>
            <Grid container direction="column">
                <Grid item>
                    <CardContent>
                        <h1>SearchResults</h1>
                        <Grid container direction="row" spacing={2}>
                            <Grid item>
                                <SearchBox
                                    anchorEl={anchorEl}
                                    searchBoxValue={searchBoxValue}
                                    onChange={handleSearchBox}
                                    menuContents={menuContentList}
                                    handleMenuClick={handleMenuClick}
                                    handleMenuClose={handleMenuClose}
                                    handleMenuContentClick={handleMenuContentClick}
                                />
                            </Grid>

                            <Grid item>
                                <h4 style={{ color: "gray" }}>
                                    {resultList.length} results
                                </h4>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Grid>

                <CardContent>
                    <Grid container direction="row" spacing={1}>
                        {resultList}
                    </Grid>
                </CardContent>
            </Grid>
        </div >
    );
}

export default SearchResults;