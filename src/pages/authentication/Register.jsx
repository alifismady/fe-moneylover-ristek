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
      {/* <div className="flex grow flex-col justify-center items-center h-screen overflow-y-auto w-full">
        <h2>Register Form</h2>
        <form
        className="flex max-w-md flex-col gap-4 w-3/5"
        onSubmit={handleSubmit}
        >
        <div>
        <div className="mb-2 block">
        <Label value="Username" />
        </div>
        <TextInput
              id="text"
              type="text"
              placeholder="Enter Your Username"
              required
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <div className="">
            <div className="mb-2 block">
              <Label value="Password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              placeholder="Enter Your Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <Label htmlFor="agree" className="flex">
              Already have an account?&nbsp;
              <Link
                to="/login"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Sign in here !
              </Link>
            </Label>
          </div>

          <Button type="submit" disabled={isLoading}>
            Sign Up
          </Button>
        </form>
      </div> */}
    </>
  )
}
