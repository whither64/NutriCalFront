import { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  // Set axios default header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchCurrentUser()
    } else {
      setLoading(false)
    }
  }, [token])

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('/api/auth/me')
      setUser(response.data.user)
    } catch (err) {
      console.error('Error fetching user:', err)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const register = async (email, password, name) => {
    try {
      const response = await axios.post('/api/auth/register', { email, password, name })
      const { token: newToken, user: newUser } = response.data
      
      localStorage.setItem('token', newToken)
      setToken(newToken)
      setUser(newUser)
      
      return { success: true, message: response.data.message }
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.error || 'Registration failed' 
      }
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password })
      const { token: newToken, user: newUser } = response.data
      
      localStorage.setItem('token', newToken)
      setToken(newToken)
      setUser(newUser)
      
      return { success: true, message: response.data.message }
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.error || 'Login failed' 
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common['Authorization']
  }

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
