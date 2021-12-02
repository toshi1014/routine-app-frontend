import {
    EmailStatus,
    PasswordStatus,
} from "./Types";

export const isValidEmail = (email: string): EmailStatus => {
    let boolValidEmail = true;
    let helperTextEmail = "";

    // TODO: add email validation

    if (!email.includes("@")) {
        helperTextEmail = "no @";
        boolValidEmail = false;
    }
    return {
        boolValidEmail: boolValidEmail,
        helperTextEmail: helperTextEmail
    };
};

export const isValidPassword = (password: string): PasswordStatus => {
    let boolValidPassword = true;
    let helperTextPassword = "";

    // TODO: add password validation

    return {
        boolValidPassword: boolValidPassword,
        helperTextPassword: helperTextPassword
    };
};