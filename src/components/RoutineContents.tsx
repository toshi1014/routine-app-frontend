import React from 'react';
import {
    Chip,
} from "@mui/material";
import { RoutineHeader, RoutineElement } from "../utils/Types";
import ContentsBase from "./ContentsBase";
import { ListItem } from "../utils/ListItem";


// TEMP:
const title = "Fishing for Biginners";
const desc = "Firstly, Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a";
const like = 30;
const contributor = "John Smith";
const lastUpdated = "2021, Jul 4";
const hashtagList = [
    "fishing",
    "hoby",
];


const routineElementList: Array<RoutineElement> = [
    {
        title: "Go to fishing shops",
        subtitle: "Why not?",
        desc: "Firstly, Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a",
        imagePath: "logo192.png",
    },
    {
        title: "Buy goods",
        subtitle: "e.g. hooks, rots",
        desc: "I recommend you to ...",
        imagePath: "logo192.png",
    },
    {
        title: "Go to sea",
        subtitle: "Beware the sunburn",
        desc: "When you get...",
        imagePath: "logo192.png",
    },
]


function RoutineContents() {
    const routineHeader: RoutineHeader = {
        title: title,
        desc: desc,
        hashtagList: hashtagList,
        like: like,
        contributor: contributor,
        lastUpdated: lastUpdated,
    };

    const handleFavorite = () => {
        console.log("Favorite");
    }

    const handleShare = () => {
        console.log("Share");
    }

    const hashtagChipList = hashtagList.map((hashtag: string, idx: number) =>
        <ListItem key={idx}>
            <Chip clickable label={"# " + hashtag} key={idx} />
        </ListItem>
    );

    const handlePost = () => {
        throw new Error("Should never be called")
    }

    return (
        <ContentsBase
            routineHeader={routineHeader}
            routineElementList={routineElementList}
            hashtagChipList={hashtagChipList}
            handleFavorite={handleFavorite}
            handleShare={handleShare}
        />
    );
}

export default RoutineContents;