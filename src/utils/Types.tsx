export type RoutineHeader = {
    title: string;
    desc: string;
    hashtagList: Array<string>;
    like: number;
    contributor: string;
    lastUpdated: string;
}

export type RoutineHeaderInput = {
    title: React.ReactElement;
    desc: React.ReactElement;
    hashtagList: React.ReactElement;
    like: number;
    contributor: string;
    lastUpdated: string;
}

export type RoutineElement = {
    title: string;
    subtitle: string;
    desc: string;
    imagePath: string;
}

export type RoutineElementInput = {
    title: React.ReactElement;
    subtitle: React.ReactElement;
    desc: React.ReactElement;
    imagePath: string;
}