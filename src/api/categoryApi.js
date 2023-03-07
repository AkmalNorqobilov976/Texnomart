import request from "@/utils/request";
const URI = 'categories'
export function getCategories() {
    return request({
        url: `products/${URI}`,
        method: 'get'
    })
}