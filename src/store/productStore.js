import { defineStore } from "pinia";
import { getProducts } from '@/api/productApi';

export const useProductStore = defineStore('product', {
    state: () => ({
        data: {
            products: [],
            total: 0,
            skip: 1,
            limit: 12
        }
    }),
    actions: {
        getProducts({ q, currentPage }) {
            return new Promise((resolve, reject) => {
                getProducts({limit: this.data.limit, skip: this.data.limit * (currentPage - 1), q})
                .then((response) => {
                    this.data = {
                        ...response?.data
                    };
                    resolve(true)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
})