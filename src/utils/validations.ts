import {
    ValidationStatus
} from "./Types";
import { isUniqueApi } from "../api_handlers/handle";


export const isValidEmail = async (email: string, uniqueReguired: boolean)
    : Promise<ValidationStatus> => {

    let boolValid = true;
    let helperText = "";

    // TODO: add email validation

    if (uniqueReguired) {
        const boolUnique = await isUniqueApi("email", email);
        if (!boolUnique) {
            helperText = "already taken";
        }
    }

    if (!email.includes("@")) {
        helperText = "no @";
    }

    if (email === "") {
        helperText = "required";
    }

    if (helperText !== "") {
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

    if (password === "") {
        helperText = "required";
    }

    if (helperText !== "") {
        boolValid = false;
    }

    return {
        boolValid: boolValid,
        helperText: helperText
    };
};

export const isValidUsername = (username: string): ValidationStatus => {
    let boolValid = true;
    let helperText = "";

    // TODO: add username validation

    if (username === "") {
        helperText = "required";
    }

    if (helperText !== "") {
        boolValid = false;
    }

    return {
        boolValid: boolValid,
        helperText: helperText
    };
};