import { getCategories } from "@/api/categoryApi"
import { defineStore } from "pinia"

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: []
    }),
    actions: {
        getCategories() {
            return new Promise((resolve, reject) => {
                getCategories()
                .then(response => {
                    this.categories = response.data;
                    resolve(true);
                }).catch(error => {
                    reject(error);
                })

            })
        }
    }
})