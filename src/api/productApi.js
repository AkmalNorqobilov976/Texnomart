import request from "@/utils/request"

const URI = 'products'
export function getProducts({limit, skip, q}) {
    let params = `?limit=${limit}`;
    params += `&skip=${skip}`;
    if(q) {
        params += `&q=${q}`;
    }
    return request({
        url: `${URI}${params}`,
        method: 'get'
    });
}