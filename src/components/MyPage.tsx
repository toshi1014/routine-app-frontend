import React from 'react';
import { RoutinePackContents, MenuChildProps } from "../utils/Types";
import MyPageBase from "./MyPageBase";


// TEMP:
const hashtagList = [
    "fishing",
    "hobby",
    "cooking",
    "DIY",
    "English",
    "workout",
];
const username = "John Smith";
const contributor = username;
const title = "Happy Coding";
const desc = "Best Way to Create App, set aside off of the heat to let rest for 10 minutes, and then serve.";
const lastUpdated = "2021, Dec 31";
const titleStep1 = "Buy Computer";
const descStep1 = "Choose best computer for you, set aside off of the heat to let rest for 10 minutes, and then serve.";
const statusMessage = "G'day!";
const followersNum = 10;
const followingNum = 10;


function MyPage() {
    const postedList: Array<RoutinePackContents> = [
        {
            contributor: contributor,
            title: title,
            desc: desc,
            lastUpdated: lastUpdated,
            titleStep1: titleStep1,
            descStep1: descStep1,
        },
        {
            contributor: contributor,
            title: title,
            desc: desc,
            lastUpdated: lastUpdated,
            titleStep1: titleStep1,
            descStep1: descStep1,
        },
    ];
    const faboriteList = postedList;

    // Menu
    const [searchBoxValue, setSearchBoxValue] = React.useState("");
    const handleSearchBox = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const input = event.target.value;
        setSearchBoxValue(input);
    }
    const menuChildProps: MenuChildProps = {
        searchBoxValue: searchBoxValue,
        setSearchBoxValue: setSearchBoxValue,
        handleSearchBox: handleSearchBox,
    }
    // end; Menu

    return (
        <MyPageBase
            username={username}
            statusMessage={statusMessage}
            followingNum={followingNum}
            followersNum={followersNum}
            hashtagList={hashtagList}
            postedList={postedList}
            faboriteList={faboriteList}
            menuChildProps={menuChildProps}
        />
    );
}

export default MyPage;