import api from '../lib/api'
import { auth } from '../lib/auth'

export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password })
    auth.setToken(data.token)
    auth.setUser(data.user)
    return data
  },

  register: async (name: string, email: string, password: string, passwordConfirmation: string) => {
    const { data } = await api.post('/auth/register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    })
    auth.setToken(data.token)
    auth.setUser(data.user)
    return data
  },

  logout: async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      auth.logout()
    }
  },

  getUser: async () => {
    const { data } = await api.get('/auth/user')
    auth.setUser(data)
    return data
  },

  updateProfile: async (profileData: Record<string, unknown>) => {
    const { data } = await api.put('/auth/user', profileData)
    auth.setUser(data.user)
    return data
  },
}
