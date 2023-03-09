import { defineStore } from "pinia";

export const useTodoListStore = defineStore('todo-list', {
    state: () => {
        
        const lists: string[] = localStorage.getItem('todo-list') && (localStorage.getItem('todo-list') as string)?.split(',') || [];
        return {
            lists
        }
    },

    actions: {
        saveStorage() {
            localStorage.setItem('todo-list', this.lists.join(','));
        },

        addList(list: string): Promise<any> {
            
            return new Promise((resolve, reject) => {
                try {
                    this.lists = [ ...this.lists, list ];
                    this.saveStorage();
                    resolve(true);
                } catch (error) {
                    reject(error);
                }
            })            
        },
        removeList(list: number): Promise<any> {
            return new Promise((resolve, reject) => {
                try {
                    this.lists.splice(list, 1)
                    this.saveStorage();
                    resolve(true);
                } catch (error) {
                    reject(error);
                }

            })
        }
    }
})