import api from '../lib/api'

export const dashboardService = {
  getStats: async () => {
    const { data } = await api.get('/dashboard/stats')
    return data
  },

  getChartWeekly: async () => {
    const { data } = await api.get('/dashboard/chart/weekly')
    return data
  },

  getChartMonthly: async () => {
    const { data } = await api.get('/dashboard/chart/monthly')
    return data
  },

  getEvaluations: async () => {
    const { data } = await api.get('/dashboard/evaluations')
    return data
  },

  getUpcomingSessions: async () => {
    const { data } = await api.get('/dashboard/upcoming-sessions')
    return data
  },
}
