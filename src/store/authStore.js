import { login } from "@/api/authApi";
import { getToken, getUser, setToken, setUser } from "@/utils/storage";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: getUser() || {},
        token: getToken() || ''
    }),
    getters: {
        isAuthecticated() {
            return !!this.token;
        }
    },

    actions: {
        login({ username, password }) {
            return new Promise((resolve, reject) => {
                login({username, password})
                    .then(response => {
                        console.log(response.data);
                        this.user = response.data;
                        this.token = response.data?.token;
                        setToken(response.data?.token);
                        setUser(response.data)
                        resolve(true);
                    }).catch(error => {
                        reject(error);
                    })
            })
        }
    }
})