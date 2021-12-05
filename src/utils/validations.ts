import {
    ValidationStatus
} from "./Types";

export const isValidEmail = (email: string): ValidationStatus => {
    let boolValid = true;
    let helperText = "";

    // TODO: add email validation

    if (!email.includes("@")) {
        helperText = "no @";
        boolValid = false;
    }
    return {
        boolValid: boolValid,
        helperText: helperText
    };
};

export const isValidPassword = (password: string): ValidationStatus => {
    let boolValid = true;
    let helperText = "";

    // TODO: add password validation

    return {
        boolValid: boolValid,
        helperText: helperText
    };
};

export const isValidUsername = (username: string): ValidationStatus => {
    let boolValid = true;
    let helperText = "";

    // TODO: add username validation

    return {
        boolValid: boolValid,
        helperText: helperText
    };
};