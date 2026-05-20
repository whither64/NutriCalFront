import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import './Auth.css'
import LogoNutri from '../../LogoNutri.png'

function Login({ onSwitchToRegister, onLoginSuccess }) {

  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    if (!formData.email || !formData.password) {
      setError('Completa todos los campos')
      return
    }

    const result = await login(
      formData.email,
      formData.password
    )

    if (result.success) {
      onLoginSuccess()
    } else {
      setError(result.error || 'Credenciales incorrectas')
    }
  }

  return (
    <div className="main">

      {/* FIGURAS */}
      <div className="top-green"></div>
      <div className="top-light"></div>

      <div className="bottom-green"></div>
      <div className="bottom-light"></div>

      {/* CONTENIDO */}
      <div className="content">

        {/* LOGO */}
        <img
          src={LogoNutri}
          alt="Logo NutriKali"
          className="logo"
        />

        {/* TITULO */}
        <h1 className="title">NUTRIKALI</h1>

        {/* ERROR */}
        {error && <p className="error">{error}</p>}

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          <label>Correo</label>

          <input
            type="email"
            placeholder="correo@ejemplo.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value
              })
            }
          />

          <label>Contraseña</label>

          <input
            type="password"
            placeholder="********"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value
              })
            }
          />

          {/* LINKS */}
          <div className="links">

            <span className="forgot">
              Olvidaste tu contraseña
            </span>

            <span
              className="register"
              onClick={onSwitchToRegister}
            >
              Regístrate
            </span>

          </div>

          {/* BOTON */}
          <button type="submit">
            Ingreso
          </button>

        </form>

      </div>

    </div>
  )
}

export default Login