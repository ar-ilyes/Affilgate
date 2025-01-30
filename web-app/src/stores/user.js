import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
  }),

  getters: {

  },

  actions: {
    async setUser(logout = false) {
      if (logout) {
        return;
      }
      
    }
  }
})