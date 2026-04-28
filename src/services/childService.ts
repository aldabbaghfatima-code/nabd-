import api from '../lib/api'

export const childService = {
  getAll: async (params?: Record<string, unknown>) => {
    const { data } = await api.get('/children', { params })
    return data
  },

  getById: async (id: number) => {
    const { data } = await api.get(`/children/${id}`)
    return data
  },

  create: async (childData: Record<string, unknown>) => {
    const { data } = await api.post('/children', childData)
    return data
  },

  update: async (id: number, childData: Record<string, unknown>) => {
    const { data } = await api.put(`/children/${id}`, childData)
    return data
  },

  delete: async (id: number) => {
    const { data } = await api.delete(`/children/${id}`)
    return data
  },

  getStats: async () => {
    const { data } = await api.get('/children/stats')
    return data
  },
}
