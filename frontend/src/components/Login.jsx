import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import './Auth.css'
import logo from '../../LogoNutri.png'

function Login({ onSwitchToRegister }) {
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await login(formData.email, formData.password)

    if (!result.success) {
      setError(result.error)
    }
  }

  return (
    <div className="main">

      {/* ESQUINAS */}
      <div className="top-green"></div>
      <div className="top-light"></div>

      <div className="bottom-green"></div>
      <div className="bottom-light"></div>

      {/* CONTENIDO */}
      <div className="content">

        <img src={logo} className="logo" />
        <h1>NUTRIKALI</h1>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>

          <label>Usuario</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />

          <a href="#">Olvidaste tu contraseña</a>
          <a onClick={onSwitchToRegister}>Registro</a>

          <button type="submit">Ingreso</button>

        </form>

      </div>
    </div>
  )
}

export default Login