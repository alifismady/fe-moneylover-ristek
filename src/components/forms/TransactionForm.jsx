import { useState } from 'react'

import { Label, TextInput, Select } from 'flowbite-react'
import { Button } from '@material-tailwind/react'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useTransactionContext } from '../../hooks/useTransactionContext'

export default function TransactionForm({ setOpenModal }) {
  const { user, token, dispatch: authDispatch } = useAuthContext()
  const { dispatch } = useTransactionContext()

  const [name, setName] = useState('')
  const [amount, setAmount] = useState()
  const [type, setType] = useState('')
  const [category, setCategory] = useState('')

  const handleTypeChange = (e) => {
    setType(e.target.value)
    setCategory('')
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      return new Error('You have to log in !')
    }

    const newTransaction = { name, amount, type, category }

    const response = await fetch('/api/transactions', {
      method: 'POST',
      body: JSON.stringify(newTransaction),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const json = await response.json()

    if (!response.ok) {
      throw new Error(json.error)
    }

    if (response.ok) {
      setOpenModal(false)
      setAmount(0)
      setCategory('')
      setName('')
      setType('')
      dispatch({ type: 'CREATE_TRANSACTION', payload: json })

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

  return (
    <>
      <form
        className="flex max-w-md flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="type" value="Type:" />
          </div>
          <Select id="type" value={type} onChange={handleTypeChange} required>
            <option value="">Select Type</option>
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </Select>
        </div>
        {type ? (
          <div>
            <div className="mb-2 block">
              <Label htmlFor="category" value="Category:" />
            </div>
            <Select
              id="category"
              value={category}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select Category</option>
              {type === 'Expense' ? (
                <>
                  <option value="Foods and Beverages">
                    Foods and Beverages
                  </option>
                  <option value="Transportation">Transportation</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Other Expenses">Other Expenses</option>
                </>
              ) : (
                <>
                  <option value="Salary">Salary</option>
                  <option value="Incoming Transfers">Incoming Transfers</option>
                  <option value="Other Incomes">Other Incomes</option>
                </>
              )}
            </Select>
          </div>
        ) : (
          <div>
            <div className="mb-2 block">
              <Label htmlFor="category" value="Category:" />
            </div>
            <Select id="category">
              <option value="">Select a Type First</option>
            </Select>
          </div>
        )}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name:" />
          </div>
          <TextInput
            type="text"
            id="name"
            placeholder="Insert Transaction Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            shadow
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="amount" value="Amount:" />
          </div>
          <TextInput
            type="number"
            id="amount"
            placeholder="Insert Transaction Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            shadow
          />
        </div>
        <Button type="submit" disabled={!name || !amount || !type || !category}>
          {!name || !amount || !type || !category
            ? 'Fill all the fields'
            : 'Add Transaction'}
        </Button>
      </form>
    </>
  )
}
