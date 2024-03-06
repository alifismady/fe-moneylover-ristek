import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Input, Button, Typography, Card } from '@material-tailwind/react'

import { useSignup } from '../../hooks/useSignup'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { signUp, isLoading, error } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signUp(username, password)
  }

  return (
    <>
      <div className="flex grow flex-col justify-center items-center h-screen overflow-y-auto w-full">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray" className="text-center">
            Sign Up
          </Typography>
          <form
            className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Username
              </Typography>
              <Input
                size="lg"
                placeholder="Enter Your Username"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="Enter Your Password"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <Typography className="text-sm text-red-500">{error}</Typography>
            )}

            <Button
              className="mt-6 hover:bg-gray-600"
              type="submit"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-gray-900">
                Sign In
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </>
  )
}
