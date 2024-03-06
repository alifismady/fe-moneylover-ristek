import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import { Button } from '@material-tailwind/react'

import { HiMenuAlt3 } from 'react-icons/hi'
import { MdOutlineDashboard } from 'react-icons/md'
import { TbReportAnalytics } from 'react-icons/tb'
import { FaMoneyBill } from 'react-icons/fa'
import { CiLogout } from 'react-icons/ci'

import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

export default function Navbar() {
  const { user } = useAuthContext()
  const { logout } = useLogout()

  const [open, setOpen] = useState(true)

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  useEffect(() => {
    if (isTabletOrMobile) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [isTabletOrMobile])

  return (
    <>
      <div
        className={`bg-black min-h-screen flex flex-col ${
          open ? 'w-72' : 'w-20'
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-between">
          {open && (
            <h2
              className={`whitespace-pre duration-500 ${
                !open && 'opacity-0 translate-x-28 overflow-hidden'
              }`}
            >
              Money Lover
            </h2>
          )}
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          <Link
            to="/dashboard"
            className={`group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
          >
            <div>
              <MdOutlineDashboard />
            </div>
            <h2
              className={`whitespace-pre duration-500 ${
                !open && 'opacity-0 translate-x-28 overflow-hidden'
              }`}
            >
              Dashboard
            </h2>
            <h2
              className={`${
                open && 'hidden'
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              Dashboard
            </h2>
          </Link>
          <Link
            to="/transaction"
            className={`group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
          >
            <div>
              <FaMoneyBill />
            </div>
            <h2
              className={`whitespace-pre duration-500 ${
                !open && 'opacity-0 translate-x-28 overflow-hidden'
              }`}
            >
              Transaction
            </h2>
            <h2
              className={`${
                open && 'hidden'
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              Transaction
            </h2>
          </Link>
          <Link
            to="/analytics"
            className={`group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
          >
            <div>
              <TbReportAnalytics />
            </div>
            <h2
              className={`whitespace-pre duration-500 ${
                !open && 'opacity-0 translate-x-28 overflow-hidden'
              }`}
            >
              Analytics
            </h2>
            <h2
              className={`${
                open && 'hidden'
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              Analytics
            </h2>
          </Link>
        </div>
        <div className="m-4 mt-auto">
          {user && (
            <>
              <h2
                className={`whitespace-pre duration-500 ${
                  !open && 'opacity-0 translate-x-28 overflow-hidden'
                }`}
              >
                Hello, {user.username}
              </h2>
              <Button
                onClick={handleLogout}
                className={` ${
                  !open && `mr-2`
                }block py-2 px-4 w-full bg-red-500 hover:bg-red-600 rounded text-white`}
              >
                {!open && (
                  <div>
                    <CiLogout />
                  </div>
                )}
                {open && (
                  <h2
                    className={`whitespace-pre duration-500 ${
                      !open && 'opacity-0 translate-x-28 overflow-hidden'
                    }`}
                  >
                    Logout
                  </h2>
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
