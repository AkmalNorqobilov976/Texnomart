import request from "@/utils/request"

const URI = 'products'


export function getProduct(id) {
    return request({
        url: `${URI}/${id}`,
        method: 'get'
    })
}
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

export function updateProductRating(data) {
    return request({
        url: `${URI}/${data.id}`,
        method: 'PUT', /* or PATCH */
        data: {
            rating: data.rating
        }
    })
}