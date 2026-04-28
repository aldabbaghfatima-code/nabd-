import api from '../lib/api'

export const articleService = {
  getAll: async (params?: Record<string, unknown>) => {
    const { data } = await api.get('/articles', { params })
    return data
  },

  getBySlug: async (slug: string) => {
    const { data } = await api.get(`/articles/${slug}`)
    return data
  },
}
