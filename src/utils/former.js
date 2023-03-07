export const queryMaker = (object) => {
    let str = "";
    for (const key in object) {
        if (object[key]) {
            str += `&${key}=${object[key]}`;
        }
    }
    return str;
}

export const clearObjectValues = (object) => {
    for (const key in object) {
        object[key] = ""
    }
    return object;
}