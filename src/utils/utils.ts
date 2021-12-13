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
    for (let i = 0; i < length; i++) {
        authCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return authCode;
}

export const decodeJwt = (token: string) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};
