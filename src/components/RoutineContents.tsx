import React from 'react';
import {
    Chip,
} from "@mui/material";
import { RoutineHeader, RoutineElement } from "../utils/Types";
import ContentsBase from "./ContentsBase";
import { ListItem } from "../utils/ListItem";
import {
    getContentsApi,
} from "../api_handlers/handle";


const defaultHeader: RoutineHeader = {
    title: "Fishing for Biginners",
    desc: "Firstly, Heat oil in a (14- to 16-inch) paella pan or a large",
    like: 30,
    contributor: "John Smith",
    lastUpdated: "2021, Jul 4",
    hashtagList: [
        "fishing",
        "hoby",
    ]
}

const defaultElementList: Array<RoutineElement> = [
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

const defaultPostId = 0;


function RoutineContents() {
    const href = window.location.href;
    const splitHref = href.split('/');
    const splitHrefLength = splitHref.length;
    const id = Number(splitHref[splitHrefLength - 1]);

    const [header, setHeader] = React.useState<RoutineHeader>(defaultHeader);
    const [elementList, setElementList] = React.useState<Array<RoutineElement>>(defaultElementList);

    const defaultHashtagChipList = defaultHeader.hashtagList.map((hashtag: string, idx: number) =>
        <ListItem key={idx}>
            <Chip clickable label={"# " + hashtag} key={idx} />
        </ListItem>
    );
    const [hashtagChipList, setHashtagChipList] = React.useState<Array<React.ReactElement>>(defaultHashtagChipList);

    const handleFavorite = () => {
        console.log("Favorite");
    }

    const handleShare = () => {
        console.log("Share");
    }


    React.useEffect(() => {
        const init = async () => {
            const res = await getContentsApi(id);

            if (res.status) {
                console.log(res.contents);
                setHeader(res.contents.header);
                setElementList(res.contents.elementList);
                const hashtagChipListTmp = res.contents.header.hashtagList.map((hashtag: string, idx: number) =>
                    <ListItem key={idx}>
                        <Chip clickable label={"# " + hashtag} key={idx} />
                    </ListItem>
                );
                setHashtagChipList(hashtagChipListTmp);

            } else {
                console.log("Err at RoutineContents");
            }
        }

        if (id !== 0){
            init();
        }
    }, [])


    return (
        <ContentsBase
            routineHeader={header}
            routineElementList={elementList}
            hashtagChipList={hashtagChipList}
            handleFavorite={handleFavorite}
            handleShare={handleShare}
        />
    );
}

export default RoutineContents;