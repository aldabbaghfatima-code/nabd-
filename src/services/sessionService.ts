import api from '../lib/api'

export const sessionService = {
  getAll: async (params?: Record<string, unknown>) => {
    const { data } = await api.get('/sessions', { params })
    return data
  },

  create: async (sessionData: Record<string, unknown>) => {
    const { data } = await api.post('/sessions', sessionData)
    return data
  },

  update: async (id: number, sessionData: Record<string, unknown>) => {
    const { data } = await api.put(`/sessions/${id}`, sessionData)
    return data
  },

  delete: async (id: number) => {
    const { data } = await api.delete(`/sessions/${id}`)
    return data
  },

  start: async (id: number) => {
    const { data } = await api.post(`/sessions/${id}/start`)
    return data
  },

  end: async (id: number, durationMinutes?: number) => {
    const { data } = await api.post(`/sessions/${id}/end`, { duration_minutes: durationMinutes })
    return data
  },
}
