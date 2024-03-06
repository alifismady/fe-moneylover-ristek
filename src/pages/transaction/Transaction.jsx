import { useEffect, useState } from 'react'

import { TextInput, Select } from 'flowbite-react'

import { Button, Typography } from '@material-tailwind/react'

import Layout from '../../layout/Layout'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useTransactionContext } from '../../hooks/useTransactionContext'

import TransactionCard from '../../components/TransactionCard'

export default function Transaction() {
  const { transactions, dispatch } = useTransactionContext()
  const { user, token } = useAuthContext()
  const [filterType, setFilterType] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [caption, setCaption] = useState('')
  const [error, setError] = useState()

  useEffect(() => {
    if (user) {
      fetchTransactions()
    }
  }, [user]) // eslint-disable-line

  const handleFilterChange = (e) => {
    setFilterType(e.target.value)
  }

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value)
  }

  const handleFilterSubmit = () => {
    fetchFilteredTransactions(filterType, filterValue)
  }

  const handleResetSubmit = () => {
    fetchTransactions()
    setFilterType('')
    setFilterValue('')
  }

  const fetchFilteredTransactions = async (type, value) => {
    const response = await fetch(`/api/transactions/${type}/${value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const json = await response.json()

    if (!response.ok) {
      setCaption('No Transaction Data')
      setError(json.error)
      dispatch({ type: 'CLEAR_TRANSACTIONS' })
      return new Error(json.error)
    }

    if (response.ok) {
      setCaption(
        `${user.username} Transactions by ${filterType}: ${filterValue}`
      )
      setError('')
      dispatch({ type: 'SET_TRANSACTIONS', payload: json })
    }
  }

  const fetchTransactions = async () => {
    const response = await fetch('/api/transactions', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const json = await response.json()

    if (response.ok) {
      setCaption(`All Transactions by ${user.username}`)
      setError('')
      dispatch({ type: 'SET_TRANSACTIONS', payload: json })
    }
  }

  if (!transactions) {
    return <div className="">loading ...</div>
  }

  return (
    <>
      <Layout>
        <div className="flex flex-col grow space-y-4 py-10 px-16 h-screen overflow-y-auto w-full">
          <h2>Transactions &gt; {user.username}</h2>
          <div className="flex flex-col rounded-md border my-2 px-8  py-6 justify-center">
            <div className="m-2">
              <h2>Filter your transactions</h2>
            </div>
            <div className="m-2">
              <Select value={filterType} onChange={handleFilterChange}>
                <option value="">Select Transaction Type</option>
                <option value="type">By Type</option>
                <option value="category">By Category</option>
                <option value="name">By Name</option>
              </Select>
            </div>
            <div className="m-2">
              {filterType === 'type' && (
                <Select value={filterValue} onChange={handleFilterValueChange}>
                  <option value="">Select Type</option>
                  <option value="Expense">Expense</option>
                  <option value="Income">Income</option>
                </Select>
              )}
              {filterType === 'category' && (
                <Select value={filterValue} onChange={handleFilterValueChange}>
                  <option value="">Select Transaction Category</option>
                  <optgroup label="Expense">
                    <option value="Foods and Beverages">
                      Foods and Beverages
                    </option>
                    <option value="Transportation">Transportation</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Others">Others</option>
                  </optgroup>
                  <optgroup label="Income">
                    <option value="Salary">Salary</option>
                    <option value="Incoming Transfer">Incoming Transfer</option>
                    <option value="Others">Others</option>
                  </optgroup>
                </Select>
              )}
              {filterType === 'name' && (
                <TextInput
                  type="text"
                  placeholder="Enter Transaction Name (Case Sensitive)"
                  value={filterValue}
                  onChange={handleFilterValueChange}
                />
              )}
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <Button
                onClick={handleFilterSubmit}
                disabled={!filterType || !filterValue}
                className="hover:bg-gray-600"
              >
                {!filterType || !filterValue ? 'Select Filter' : 'Apply Filter'}
              </Button>
              <Button onClick={handleResetSubmit} className="hover:bg-gray-600">
                Reset Filter
              </Button>
            </div>
          </div>
          <div className="flex flex-col rounded-md border my-2 px-8 py-2 min-h-screen">
            {transactions && transactions.length === 0 ? (
              <>
                <Typography variant="h4">No Transaction</Typography>
              </>
            ) : (
              <>
                <Typography variant="h4">{caption}</Typography>
                {transactions &&
                  transactions.map((transaction) => (
                    <TransactionCard
                      key={transaction._id}
                      transaction={transaction}
                    />
                  ))}
                {error && <div>{error}</div>}
              </>
            )}
          </div>
        </div>
      </Layout>
    </>
  )
}
