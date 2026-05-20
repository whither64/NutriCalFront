import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import './Auth.css'

function Register({ onSwitchToLogin }) {

  const { register } = useAuth()

  const [formData, setFormData] = useState({
    nombre: '',        // ✅ Cambiado de "name" a "nombre"
    correo: '',        // ✅ Cambiado de "email" a "correo"
    contraseña: '',    // ✅ Cambiado de "password" a "contraseña"
    confirmPassword: '',
    edad: '',          // ✅ NUEVO - requerido
    peso: '',          // ✅ NUEVO - requerido
    estatura: '',      // ✅ NUEVO - requerido
    objetivo: ''       // ✅ NUEVO - opcional
  })

  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validar campos requeridos
    if (
      !formData.nombre ||
      !formData.correo ||
      !formData.contraseña ||
      !formData.confirmPassword ||
      !formData.edad ||
      !formData.peso ||
      !formData.estatura
    ) {
      setError('Completa todos los campos obligatorios')
      return
    }

    if (formData.contraseña !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    // ✅ Llamar a register con los campos correctos
    const result = await register(
      formData.nombre,      // nombre
      formData.correo,      // correo
      formData.contraseña,  // contraseña
      parseInt(formData.edad),      // edad (número)
      parseFloat(formData.peso),    // peso (número)
      parseFloat(formData.estatura), // estatura (número)
      formData.objetivo || null     // objetivo (opcional)
    )

    if (!result.success) {
      setError(result.error)
    } else {
      alert('Usuario registrado correctamente')
      onSwitchToLogin()
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
          {/* NOMBRE */}
          <label>Nombre *</label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
          />

          {/* CORREO */}
          <label>Correo *</label>
          <input
            type="email"
            value={formData.correo}
            onChange={(e) =>
              setFormData({ ...formData, correo: e.target.value })
            }
          />

          {/* CONTRASEÑA */}
          <label>Contraseña *</label>
          <input
            type="password"
            value={formData.contraseña}
            onChange={(e) =>
              setFormData({ ...formData, contraseña: e.target.value })
            }
          />

          {/* CONFIRMAR CONTRASEÑA */}
          <label>Confirmar contraseña *</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />

          {/* EDAD */}
          <label>Edad *</label>
          <input
            type="number"
            value={formData.edad}
            onChange={(e) =>
              setFormData({ ...formData, edad: e.target.value })
            }
          />

          {/* PESO */}
          <label>Peso (kg) *</label>
          <input
            type="number"
            step="0.1"
            value={formData.peso}
            onChange={(e) =>
              setFormData({ ...formData, peso: e.target.value })
            }
          />

          {/* ESTATURA */}
          <label>Estatura (m) *</label>
          <input
            type="number"
            step="0.01"
            value={formData.estatura}
            onChange={(e) =>
              setFormData({ ...formData, estatura: e.target.value })
            }
          />

          {/* OBJETIVO (opcional) */}
          <label>Objetivo (opcional)</label>
          <select
            value={formData.objetivo}
            onChange={(e) =>
              setFormData({ ...formData, objetivo: e.target.value })
            }
          >
            <option value="">Selecciona un objetivo</option>
            <option value="perder_peso">Perder peso</option>
            <option value="mantener_peso">Mantener peso</option>
            <option value="ganar_musculo">Ganar músculo</option>
          </select>

          <button type="submit">Registrarse</button>
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