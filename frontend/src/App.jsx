import { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './pages/Dashboard'

function App() {

  const [showRegister, setShowRegister] = useState(false)
  const [isLogged, setIsLogged] = useState(false)

  return (
    <>
      {/* SI YA LOGUEÓ → DASHBOARD */}
      {isLogged ? (
        <Dashboard />
      ) : (
        <>
          {/* LOGIN / REGISTER */}
          {showRegister ? (
            <Register
              onSwitchToLogin={() => setShowRegister(false)}
            />
          ) : (
            <Login
              onSwitchToRegister={() => setShowRegister(true)}
              onLoginSuccess={() => setIsLogged(true)}
            />
          )}
        </>
      )}
    </>
  )
}

export default App
