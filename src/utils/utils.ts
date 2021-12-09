export const range = (start: number, end: number) => {
    let arr = [];
    for (let i = start; i < end; i++) {
        arr.push(i);
    }

    return arr;
}

export const generateAuthCode = (length: number) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let authCode = "";
    for (let i = 0; i < length; i++){
        authCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return authCode;
}