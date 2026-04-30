import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import './Auth.css'

function Register({ onSwitchToLogin }) {
  const { register } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.password) {
      setError('Todos los campos son obligatorios')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    const result = await register(
      formData.email,
      formData.password,
      formData.name
    )

    if (!result.success) {
      setError(result.error)
    }
  }

  return (
    <div className="main">

      <div className="top-green"></div>
      <div className="top-light"></div>
      <div className="bottom-green"></div>
      <div className="bottom-light"></div>

      <div className="content">

        <h1 className="title">ÚNETE A NUTRIKALI</h1>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>

          <label>Nombre</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />

          <label>Correo</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />

          <label>Confirmar contraseña</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          />

          <button type="submit">Registrar</button>

        </form>

        <p className="auth-switch">
          ¿Ya tienes cuenta?{' '}
          <span onClick={onSwitchToLogin}>Inicia sesión</span>
        </p>

      </div>
    </div>
  )
}

export default Register