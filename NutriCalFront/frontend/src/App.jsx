import { useState, useEffect } from 'react'
import axios from 'axios'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './components/Login'
import Register from './components/Register'
import './App.css'

function MainApp() {
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth()
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showLogin, setShowLogin] = useState(true)
  const [newFood, setNewFood] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  })

  useEffect(() => {
    if (!authLoading) {
      fetchFoods()
    }
  }, [authLoading, isAuthenticated])

  const fetchFoods = async () => {
    try {
      const response = await axios.get('/api/foods')
      setFoods(response.data)
      setLoading(false)
    } catch (err) {
      setError('Error al cargar alimentos')
      setLoading(false)
      console.error(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      setError('Debes iniciar sesión para agregar alimentos')
      return
    }

    try {
      await axios.post('/api/foods', {
        ...newFood,
        calories: parseFloat(newFood.calories),
        protein: parseFloat(newFood.protein),
        carbs: parseFloat(newFood.carbs),
        fat: parseFloat(newFood.fat)
      })
      setNewFood({ name: '', calories: '', protein: '', carbs: '', fat: '' })
      setError(null)
      fetchFoods()
    } catch (err) {
      setError(err.response?.data?.error || 'Error al agregar alimento')
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    if (!isAuthenticated) {
      setError('Debes iniciar sesión para eliminar alimentos')
      return
    }

    try {
      await axios.delete(`/api/foods/${id}`)
      setError(null)
      fetchFoods()
    } catch (err) {
      setError(err.response?.data?.error || 'Error al eliminar alimento')
      console.error(err)
    }
  }

  if (authLoading) {
    return <div className="container">Cargando...</div>
  }

  if (!isAuthenticated) {
    return showLogin ? (
      <Login onSwitchToRegister={() => setShowLogin(false)} />
    ) : (
      <Register onSwitchToLogin={() => setShowLogin(true)} />
    )
  }

  if (loading) return <div className="container">Cargando alimentos...</div>

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1>🥗 NutriCal</h1>
          <p className="subtitle">Calculadora Nutricional</p>
        </div>
        <div className="user-info">
          <span>Hola, {user?.name}!</span>
          <button className="logout-btn" onClick={logout}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="form-container">
        <h2>Agregar Alimento</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre del alimento"
            value={newFood.name}
            onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
            required
          />
          <input
            type="number"
            step="0.1"
            placeholder="Calorías (kcal)"
            value={newFood.calories}
            onChange={(e) => setNewFood({ ...newFood, calories: e.target.value })}
            required
          />
          <input
            type="number"
            step="0.1"
            placeholder="Proteínas (g)"
            value={newFood.protein}
            onChange={(e) => setNewFood({ ...newFood, protein: e.target.value })}
            required
          />
          <input
            type="number"
            step="0.1"
            placeholder="Carbohidratos (g)"
            value={newFood.carbs}
            onChange={(e) => setNewFood({ ...newFood, carbs: e.target.value })}
            required
          />
          <input
            type="number"
            step="0.1"
            placeholder="Grasas (g)"
            value={newFood.fat}
            onChange={(e) => setNewFood({ ...newFood, fat: e.target.value })}
            required
          />
          <button type="submit">Agregar Alimento</button>
        </form>
      </div>

      <div className="foods-container">
        <h2>Lista de Alimentos</h2>
        {foods.length === 0 ? (
          <p>No hay alimentos registrados</p>
        ) : (
          <div className="foods-grid">
            {foods.map((food) => (
              <div key={food.id} className="food-card">
                <h3>{food.name}</h3>
                <div className="nutrition-info">
                  <p><strong>Calorías:</strong> {food.calories} kcal</p>
                  <p><strong>Proteínas:</strong> {food.protein}g</p>
                  <p><strong>Carbohidratos:</strong> {food.carbs}g</p>
                  <p><strong>Grasas:</strong> {food.fat}g</p>
                </div>
                {food.user_id && (
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDelete(food.id)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  )
}

export default App
