import { Link } from 'react-router-dom'

import { Button } from '@material-tailwind/react'

export default function Landing() {
  return (
    <div className="flex flex-col py-10 px-16 h-screen border overflow-y-auto w-full justify-center items-center">
      <h2 className="text-4xl font-bold mb-8">Money Lover</h2>
      <p className="text-xl mb-8">Manage your finances effortlessly.</p>
      <div className="space-x-4">
        <Link to="/login">
          <Button color="" size="lg" className='hover:bg-gray-600'>
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button color="" size="lg" className='hover:bg-gray-600'>
            Register
          </Button>
        </Link>
      </div>
    </div>
  )
}
