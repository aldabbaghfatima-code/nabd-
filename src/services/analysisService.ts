import api from '../lib/api'

export const analysisService = {
  startRealTime: async (sessionId: number, childId: number) => {
    const { data } = await api.post('/analysis/real-time/start', {
      session_id: sessionId,
      child_id: childId,
      analysis_type: 'real_time',
    })
    return data
  },

  sendFrame: async (sessionId: number, frame: string, timestamp?: number) => {
    const { data } = await api.post('/analysis/real-time/frame', {
      session_id: sessionId,
      frame,
      timestamp,
    })
    return data
  },

  endRealTime: async (analysisSessionId: number) => {
    const { data } = await api.post(`/analysis/real-time/end/${analysisSessionId}`)
    return data
  },

  getResults: async (analysisSessionId: number) => {
    const { data } = await api.get(`/analysis/real-time/${analysisSessionId}/results`)
    return data
  },

  uploadVideo: async (sessionId: number, childId: number, videoFile: File) => {
    const formData = new FormData()
    formData.append('session_id', String(sessionId))
    formData.append('child_id', String(childId))
    formData.append('video', videoFile)

    const { data } = await api.post('/analysis/video/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },
}
