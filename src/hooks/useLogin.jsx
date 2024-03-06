import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const navigate = useNavigate()

  const login = async (username, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    const user = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(user.error)
    }

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(user))
      dispatch({ type: 'LOGIN', payload: user })
      setIsLoading(false)
      setError(false)
      navigate('/dashboard')
    }
  }

  return { login, isLoading, error }
}
