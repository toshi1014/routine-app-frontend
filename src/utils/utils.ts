export const range = (start: number, end: number) => {
    let arr = [];
    for (let i = start; i < end; i++) {
        arr.push(i);
    }

    return arr;
}

export const generateAuthCode = (length: number) => {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let authCode = "";
    for (let i = 0; i < length; i++) {
        authCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // always start with Uppercase
    const upperedFirstLetter = authCode.charAt(0).toUpperCase();
    const firstLetterUpperedAuthCode = upperedFirstLetter + authCode.substring(1, length);

    return firstLetterUpperedAuthCode;
}

export const decodeJwt = (token: string) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};


export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    try {
        if (token === null) return false;
        const decodedToken = decodeJwt(token);
        const d = new Date();
        const now = d.getTime() * 0.001;
        if (now < Number(decodedToken.exp)) {
            return true;
        } else {
            return false;
        }
    } catch{
        return false;
    }
}


export const json2csv = (columns: Array<string>, records: Array<Array<string | number>>) => {
    let strOut = "";

    // write columns
    for (let column of columns) {
        if (column !== "") {
            strOut += "," + column
        }
    }
    strOut += "\r\n";

    // write records
    for (let record_i = 0; record_i < records.length; record_i++) {
        let line = "";
        for (let val of records[record_i]) {
            if (line !== "") { line += "," }
            line += val
        }
        strOut += line + "\r\n";
    }

    return strOut;
}