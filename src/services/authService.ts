import api from './api'

export const AuthService = {
  async login(username: string, password: string): Promise<{ token: string; role: string }> {
    const response = await api.post('/auth/login', { username, password })
    return response.data
  },

  logout(): void {
    console.info('User logged out.')
  }
}
