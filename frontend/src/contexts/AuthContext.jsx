// contexts/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

// ✅ Configurar URL base de Axios
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
axios.defaults.baseURL = API_URL

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
      const response = await axios.get('/auth/me')  // ✅ Sin /api porque baseURL ya lo tiene
      setUser(response.data.usuario)
    } catch (err) {
      console.error(err)
      logout()
    } finally {
      setLoading(false)
    }
  }

  // ✅ REGISTRO - Campos corregidos
  const register = async (nombre, correo, contraseña, edad, peso, estatura, objetivo) => {
    try {
      const response = await axios.post('/auth/register', {
        nombre: nombre,      // ← backend espera "nombre"
        correo: correo,      // ← backend espera "correo"
        contraseña: contraseña, // ← backend espera "contraseña"
        edad: edad,
        peso: peso,
        estatura: estatura,
        objetivo: objetivo
      })

      return {
        success: true,
        message: response.data.message
      }
    } catch (err) {
      console.log(err.response?.data)
      return {
        success: false,
        error: err.response?.data?.error || 'Error al registrar'
      }
    }
  }

  // ✅ LOGIN - Campos corregidos
  const login = async (correo, contraseña) => {
    try {
      const response = await axios.post('/auth/login', {
        correo: correo,      // ← Cambiado de "email" a "correo"
        contraseña: contraseña // ← Cambiado de "password" a "contraseña"
      })

      const { token, usuario } = response.data

      localStorage.setItem('token', token)
      setToken(token)
      setUser(usuario)

      return { success: true }
    } catch (err) {
      console.log("ERROR COMPLETO:")
      console.log(err)
      console.log(err.response)
      console.log(err.response?.data)

      return {
        success: false,
        error: err.response?.data?.error || 'Error al iniciar sesión'
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