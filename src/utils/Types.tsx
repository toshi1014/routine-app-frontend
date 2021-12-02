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

export type RoutineHeaderRef = {
    title: {
        value: string;
    },
    desc: {
        value: string;
    },
}

export type RoutineElementRef = RoutineHeaderRef & {
    subtitle: {
        value: string;
    },
}

export type EmailStatus = {
    boolValidEmail: boolean;
    helperTextEmail: string;
}

export type PasswordStatus = {
    boolValidPassword: boolean;
    helperTextPassword: string;
}