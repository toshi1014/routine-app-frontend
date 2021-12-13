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
    username: string;
}