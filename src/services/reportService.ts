import api from '../lib/api'

export const reportService = {
  getAll: async (params?: Record<string, unknown>) => {
    const { data } = await api.get('/reports', { params })
    return data
  },

  getById: async (id: number) => {
    const { data } = await api.get(`/reports/${id}`)
    return data
  },

  create: async (reportData: Record<string, unknown>) => {
    const { data } = await api.post('/reports', reportData)
    return data
  },

  update: async (id: number, reportData: Record<string, unknown>) => {
    const { data } = await api.put(`/reports/${id}`, reportData)
    return data
  },

  delete: async (id: number) => {
    const { data } = await api.delete(`/reports/${id}`)
    return data
  },

  exportPdf: async (id: number) => {
    const { data } = await api.get(`/reports/${id}/pdf`)
    return data
  },

  getStats: async () => {
    const { data } = await api.get('/reports/stats')
    return data
  },

  getChartMonthly: async () => {
    const { data } = await api.get('/reports/chart/monthly')
    return data
  },

  getChartWeekly: async () => {
    const { data } = await api.get('/reports/chart/weekly')
    return data
  },

  getStatusDistribution: async () => {
    const { data } = await api.get('/reports/status-distribution')
    return data
  },
}
