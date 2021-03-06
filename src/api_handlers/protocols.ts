import {
    RoutinePackContents,
    UserNameIdBadge,
    Badge,
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

export type IsUnique = {
    boolUnique: boolean;
}

export type NewToken = {
    newToken: string;
}

export type Mypage = {
    header: {
        username: string;
        badge: Badge;
        statusMessage: string;
        hashtagList: Array<string>;
        followersNum: number;
        followingNum: number;
        Facebook: string;
        Twitter: string;
        Instagram: string;
    },
    postedList: Array<RoutinePackContents>,
    favoriteList: Array<RoutinePackContents>,
}

export type MypageLogin = Mypage & {
    draftList: Array<RoutinePackContents>;
}

export type SearchResults = {
    resultList: Array<RoutinePackContents>;
    pageLength: number;
}

export type UserList = {
    userList: Array<UserNameIdBadge>;
}

export type DbTable = {
    columns: Array<string>;
    records: Array<Array<string | number>>;
}

export type AdminUser = {
    boolAdminUser: boolean;
}

export type Post = {
    postId: number;
}