import { defineStore } from 'pinia'
import router from '../router'
import { AuthService } from '../services/authService'
import { HelperService } from '../services/helperService'
import { ROUTE_NAMES, ROUTE_PATHS } from '../models/auth-model'

interface AuthState {
  token: string
  username: string
  role: string
}

export const useUserStore = defineStore('user', {
  state: (): AuthState => ({
    token: HelperService.getStoredValue('auth_token'),
    username: HelperService.getStoredValue('auth_username'),
    role: HelperService.getStoredValue('auth_role'),
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.token,
    userRole: (state): string => state.role,
  },

  actions: {
    async login(username: string, password: string): Promise<void> {
      try {
        const { token, role } = await AuthService.login(username, password)

        this.token = token
        this.username = username
        this.role = role

        this.persistAuth()
        router.push(this.getRoleHomePath(role))
      } catch (error: any) {
        alert(error?.message || 'Login failed')
      }
    },

    logout(): void {
      this.clearAuth()
      AuthService.logout()
      router.push({ name: ROUTE_NAMES.LOGIN })
    },

    getRoleHomePath(role: string): string {
      return {
        admin: ROUTE_PATHS.ADMIN,
        student: ROUTE_PATHS.STUDENT,
      }[role] || ROUTE_PATHS.DASHBOARD
    },

    persistAuth(): void {
      HelperService.setStoredValue('auth_token', this.token)
      HelperService.setStoredValue('auth_username', this.username)
      HelperService.setStoredValue('auth_role', this.role)
    },

    clearAuth(): void {
      this.token = ''
      this.username = ''
      this.role = ''
      HelperService.setStoredValue('auth_token', '')
      HelperService.setStoredValue('auth_username', '')
      HelperService.setStoredValue('auth_role', '')
    },
  },
})
