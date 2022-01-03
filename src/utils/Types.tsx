export type RoutineHeader = {
    title: string;
    desc: string;
    hashtagList: Array<string>;
    like: number;
    contributor: string;
    contributorId: number;
    lastUpdated: string;
}

export type RoutineHeaderInput = {
    title: React.ReactElement;
    desc: React.ReactElement;
    hashtagList: React.ReactElement;
    like: number;
    contributor: string;
    contributorId: number;
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

export type RoutineContents = {
    header: RoutineHeader;
    elementList: Array<RoutineElement>;
}

export type RoutinePackContents = {
    id: number;
    contributor: string;
    contributorId: number;
    title: string;
    desc: string;
    titleStep1: string;
    descStep1: string;
    like: number;
}

export type ValidationStatus = {
    boolValid: boolean;
    helperText: string;
}

export type MenuChildProps = {
    searchBoxValue: string;
    setSearchBoxValue: React.Dispatch<React.SetStateAction<string>>;
    handleSearchBox: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

export type ChipData = {
    key: number;
    label: string;
}

export type UserNameId = {
    username: string;
    userId: number;
}

export type EmailAddress = {
    emailAddress: string;
}

export type AuthEmail = EmailAddress & {
    purpose: "auth";
    context: {
        username: string;
        authCode: string;
    }
}