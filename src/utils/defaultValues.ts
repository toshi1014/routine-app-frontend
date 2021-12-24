import {
    RoutineHeader,
    RoutineElement,
} from "./Types";

// header
export const defaultId = 0;
export const defaultUsername = "John Doe";
export const defaultStatusMessage = "G'dai!";
export const defaultHashtagList = ["unhashable"];
export const defaultHashtagAddedList = [{ key: 0, label: defaultHashtagList[0] }];
export const defaultFollowingNum = 9999;
export const defaultFollowersNum = 9999;
export const defaultLastUpdated = "----, --:--";

// pack
export const defaultTitle = "Happy Coding";
export const defaultContributor = defaultUsername;
export const defaultContributorId = 0;
export const defaultDesc = "Best Way to Create App, set aside off of the heat to let rest for 10 minutes, and then serve.";
export const defaultTitleStep1 = "Buy Computer";
export const defaultDescStep1 = "Choose best computer for you, set aside off of the heat to let rest for 10 minutes, and then serve.";
export const defaultLike = 10;

// contents
export const defaultHeader: RoutineHeader = {
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

export const defaultElementList: Array<RoutineElement> = [
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

export const defaultPostId = 0;