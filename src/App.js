import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Flowbite } from 'flowbite-react'

import { useAuthContext } from './hooks/useAuthContext'

import Landing from './pages/Landing'
import Register from './pages/authentication/Register'
import Login from './pages/authentication/Login'
import Dashboard from './pages/dashboard/Dashboard'
import Transaction from './pages/transaction/Transaction'
import Analytics from './pages/analytics/Analytics'

function App() {
  const { user } = useAuthContext()
  return (
    <div className="flex">
      <BrowserRouter>
        <Flowbite>
          <Routes>
            <Route path="/" element={user ? <Dashboard /> : <Landing />} />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Landing />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/transaction"
              element={user ? <Transaction /> : <Landing />}
            />
            <Route
              path="/analytics"
              element={user ? <Analytics /> : <Landing />}
            />
          </Routes>
        </Flowbite>
      </BrowserRouter>
    </div>
  )
}

export default App
