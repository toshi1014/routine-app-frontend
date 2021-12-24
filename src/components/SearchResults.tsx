import React from 'react';
import {
    Grid,
    CardContent,
    Box,
    Stack,
    Pagination,
} from "@mui/material";
import SearchBox from './SearchBox';
import RoutinePack from './RoutinePack';
import { range } from "../utils/utils";
import { RoutinePackContents } from "../utils/Types";
import { searchApi } from "../api_handlers/handle";
import {
    defaultId,
    defaultTitle,
    defaultContributor,
    defaultContributorId,
    defaultDesc,
    defaultTitleStep1,
    defaultDescStep1,
    defaultLike,
} from "../utils/defaultValues";


const menuContentList = [
    "All",
    "Trend",
    "Popular",
    "Hashtag",
];

function SearchResults() {
    const href = window.location.href;
    const splitHref = href.split('/');
    const splitHrefLength = splitHref.length;

    const page = Number(splitHref[splitHrefLength - 1]);
    const keyword = (isNaN(page) ? "" : splitHref[splitHrefLength - 3]);
    const target = (isNaN(page) ? "" : splitHref[splitHrefLength - 2]);

    const [pageLength, setPageLength] = React.useState(1);

    const [resultList, setResultList] = React.useState<Array<RoutinePackContents>>([
        {
            id: defaultId,
            contributor: defaultContributor,
            contributorId: defaultContributorId,
            title: defaultTitle,
            desc: defaultDesc,
            titleStep1: defaultTitleStep1,
            descStep1: defaultDescStep1,
            like: defaultLike,
        }
    ]);

    const resultListComp = resultList.map((result: RoutinePackContents, idx: number) =>
        <Grid item key={idx}>
            <RoutinePack
                id={result.id}
                contributor={result.contributor}
                contributorId={result.contributorId}
                title={result.title}
                desc={result.desc}
                titleStep1={result.titleStep1}
                descStep1={result.descStep1}
                like={result.like}
            />
        </Grid>
    );

    // COMBAK: change page
    const handleChangePagination = (event: React.ChangeEvent<unknown>, val: number) => {
        console.log(val);
    }

    React.useEffect(() => {
        const init = async () => {
            const res = await searchApi(keyword, target, page);
            if (res.status) {
                setResultList(res.contents.resultList);
            } else {
                console.log("Err at RoutineContents");
            }
            console.log(res);
        }

        if (!isNaN(page)) {
            console.log("init");
            init();
        } else {
            setResultList([]);
            console.log("init not called");
        }

    }, [])


    return (
        <Grid container direction="column">
            <Grid item>
                <CardContent>
                    <h1>SearchResults</h1>
                    <Grid container direction="row" spacing={2}>
                        <Grid item>
                            <SearchBox
                                defaultValue={keyword}
                                defaultTarget={target}
                                menuContentList={menuContentList}
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

            <Grid item>
                <CardContent>
                    <Grid container direction="row" spacing={1}>
                        {resultListComp}
                    </Grid>
                </CardContent>
            </Grid>

            <Grid item>
                <Box
                    component="div"
                    sx={{
                        whiteSpace: 'nowrap',
                        my: 5,
                    }}
                >
                </Box>
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="flex-end"
                    justifyContent="center"
                >
                    <Pagination
                        count={pageLength}
                        page={isNaN(page) ? 1 : page}
                        shape="rounded"
                        onChange={handleChangePagination}
                    />
                </Stack>
            </Grid>
        </Grid>
    );
}

export default SearchResults;