import {
    RoutinePackContents,
} from "../utils/Types";


export type Response<T> =
    | {
        status: true;
        token: string;
        contents: T;
    }
    | {
        status: false;
        token: null;
        errorMessage: string;
    }

export type Mypage = {
    header: {
        username: string;
        statusMessage: string;
        hashtagList: Array<string>;
        followersNum: number;
        followingNum: number;
    },
    postedList: Array<RoutinePackContents>,
    draftList: Array<RoutinePackContents>,
}

export type SearchResults = {
    resultList: Array<RoutinePackContents>;
    pageLength: number;
}