import api from '../lib/api'

export const notificationService = {
  getAll: async (params?: Record<string, unknown>) => {
    const { data } = await api.get('/notifications', { params })
    return data
  },

  markAsRead: async (id: string) => {
    const { data } = await api.post(`/notifications/${id}/read`)
    return data
  },

  markAllAsRead: async () => {
    const { data } = await api.post('/notifications/read-all')
    return data
  },
}
