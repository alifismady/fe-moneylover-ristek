import { useEffect, useState } from 'react'

import { Modal } from 'flowbite-react'
import { Typography, Button } from '@material-tailwind/react'
import Chart from 'react-apexcharts'

import Layout from '../../layout/Layout'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useTransactionContext } from '../../hooks/useTransactionContext'

import TransactionCard from '../../components/TransactionCard'
import TransactionForm from '../../components/forms/TransactionForm'

export default function Dashboard() {
  const [openModal, setOpenModal] = useState(false)
  const { transactions, dispatch } = useTransactionContext()
  const {
    user,
    token,
    balance,
    total_expenses,
    total_incomes,
    dispatch: authDispatch,
  } = useAuthContext()

  const closeModal = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch('/api/transactions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_TRANSACTIONS', payload: json })

        const response = await fetch('/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        const jsonUpdate = await response.json()

        if (!response.ok) {
          throw new Error(jsonUpdate.error)
        }

        if (response.ok) {
          authDispatch({ type: 'UPDATE_BALANCE', payload: jsonUpdate })
        }
      }
    }

    if (user) {
      fetchTransactions()
    }
  }, [user]) // eslint-disable-line

  const formatToRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    })
      .format(amount)
      .replace('Rp', ' Rp')
  }

  const chartExpIncConfig = {
    type: 'pie',
    series: [total_expenses, total_incomes],
    width: 400,
    options: {
      labels: ['Expenses', 'Incomes'],
      colors: ['#F05252', '#0E9F6E'],
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 50,
            },
          },
        },
      ],
    },
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Layout>
        <div className="flex flex-col py-10 px-16 h-screen overflow-y-auto w-full">
          <h2>Dashboard &gt; {user.username}</h2>

          <div className="flex flex-row xl:space-x-6 py-6 xl:flex-row md:flex-col md:space-x-0 sm:flex-col sm:space-x-0">
            <div className="flex flex-col grow rounded-md border p-8 xl:w-3/5 md:w-full sm:w-full justify-center mb-0 md:mb-3">
              <div className="my-3">
                <Typography variant="h3">{formatToRupiah(balance)}</Typography>
                <Typography variant="h6" color="gray">
                  Balance
                </Typography>
              </div>
            </div>
            <div className="flex flex-col grow rounded-md border p-8 xl:w-3/5 md:w-full sm:w-full justify-center mb-0 md:mb-3">
              <div className="my-3">
                <Typography variant="h3">
                  {formatToRupiah(total_expenses)}
                </Typography>
                <Typography variant="h6" color="gray">
                  Total Expenses
                </Typography>
              </div>
            </div>
            <div className="flex flex-col grow rounded-md border p-8 xl:w-3/5 md:w-full sm:w-full justify-center mb-0 md:mb-3">
              <div className="my-3">
                <Typography variant="h3">
                  {formatToRupiah(total_incomes)}
                </Typography>
                <Typography variant="h6" color="gray">
                  Total Incomes
                </Typography>
              </div>
            </div>
            <div className="flex grow p-8 xl:w-2/5 md:w-full sm:w-full mb-3 justify-center">
              <div className="flex flex-col justify-start">
                <Typography variant="h4" className="text-center">
                  Add New Transaction
                </Typography>
                <Button
                  onClick={() => setOpenModal(true)}
                  className="flex items-center justify-center hover:bg-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </Button>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                  <Modal.Header>Transaction Form</Modal.Header>
                  <Modal.Body>
                    <TransactionForm setOpenModal={closeModal} />
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
          <div className="flex flex-row space-x-8 py-6 h-full xl:flex-row md:flex-col md:space-x-0 sm:flex-col sm:space-x-0">
            <div className="flex flex-col xl:w-3/5 pr-4 py-4 md:w-full sm:w-full">
              {transactions && transactions.length === 0 ? (
                <Typography variant="h4"> You have no Transaction</Typography>
              ) : (
                <Typography variant="h4">Your recent Transactions</Typography>
              )}
              {transactions &&
                transactions
                  .slice(0, 4)
                  .map((transaction) => (
                    <TransactionCard
                      key={transaction._id}
                      transaction={transaction}
                    />
                  ))}
            </div>
            <div className="flex flex-col rounded-md border xl:w-2/5 p-8 space-y-2 md:w-full sm:w-full">
              <div className="flex flex-col flex-grow items-center pl-4 py-4">
                {transactions && transactions.length === 0 ? (
                  <Typography variant="h4"></Typography>
                ) : (
                  <>
                    <Typography variant="h6">
                      Your Expenses vs Incomes
                    </Typography>
                    <div className="mt-5 p-5">
                      <Chart {...chartExpIncConfig} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
