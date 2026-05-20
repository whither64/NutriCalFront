import { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  // Configurar token automáticamente
  useEffect(() => {

    if (token) {

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchCurrentUser()

    } else {

      setLoading(false)

    }

  }, [token])

  // Obtener usuario actual
  const fetchCurrentUser = async () => {

    try {

      const response = await axios.get('/api/auth/me')

      setUser(response.data.usuario)

    } catch (err) {

      console.error(err)

      logout()

    } finally {

      setLoading(false)

    }

  }

  // REGISTRO
  const register = async (email, password, name) => {

    try {

      const response = await axios.post('/api/auth/register', {
        name: name,
        email: email,
        password: password
      })

      return {
        success: true,
        message: response.data.message
      }

    } catch (err) {

      console.log(err.response?.data)

      return {
        success: false,
        error: err.response?.data?.message || 'Error al registrar'
      }

    }

  }

  // LOGIN
  const login = async (email, password) => {

    try {

      const response = await axios.post('/api/auth/login', {
        email: email,
        password: password
      })

      const { token, usuario } = response.data

      localStorage.setItem('token', token)

      setToken(token)
      setUser(usuario)

      return {
        success: true
      }

    } catch (err) {

      console.log("ERROR COMPLETO:")
      console.log(err)
      console.log(err.response)
      console.log(err.response?.data)

      return {
        success: false,
        error: JSON.stringify(err.response?.data) || 'Error al registrar'
      }

    }

  }

  // LOGOUT
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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )

}

export const useAuth = () => {

  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context

}