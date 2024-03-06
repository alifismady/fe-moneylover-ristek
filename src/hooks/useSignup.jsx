import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const navigate = useNavigate()

  const signUp = async (username, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('api/auth/register', {
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
      navigate('/login')
      setError('')
      setIsLoading(false)
    }
  }

  return { signUp, isLoading, error }
}
