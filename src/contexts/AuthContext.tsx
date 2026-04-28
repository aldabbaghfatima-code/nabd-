import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { auth } from '../lib/auth'
import { authService } from '../services/authService'

interface User {
  id: number
  name: string
  email: string
  role: string
  avatar?: string
  phone?: string
  organization?: string
  language?: string
  dark_mode?: boolean
  notifications_enabled?: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<void>
  logout: () => Promise<void>
  updateUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(auth.getUser())
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user && auth.isAuthenticated()

  useEffect(() => {
    const checkAuth = async () => {
      if (auth.isAuthenticated()) {
        try {
          const userData = await authService.getUser()
          setUser(userData)
        } catch {
          auth.logout()
          setUser(null)
        }
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const data = await authService.login(email, password)
    setUser(data.user)
  }, [])

  const register = useCallback(async (name: string, email: string, password: string, passwordConfirmation: string) => {
    const data = await authService.register(name, email, password, passwordConfirmation)
    setUser(data.user)
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    setUser(null)
  }, [])

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser)
    auth.setUser(updatedUser)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export default AuthContext
