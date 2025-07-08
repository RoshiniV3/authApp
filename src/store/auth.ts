import { defineStore } from 'pinia'
import router from '../router'
import { AuthService } from '../services/authService';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    username: '',
    role: ''
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const result = await AuthService.login(username, password)
        this.token = result.token
        this.username = username
        this.role = result.role
        router.push('/')
      } catch (error: any) {
        alert(error.message)
      }
    },
    logout() {
      this.token = ''
      this.username = ''
      this.role = ''
      AuthService.logout()
      router.push('/login')
    }
  }
})
