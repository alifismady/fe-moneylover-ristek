import { TransactionContext } from '../context/TransactionContext'
import { useContext } from 'react'

export const useTransactionContext = () => {
  const context = useContext(TransactionContext)

  if(!context) {
    throw Error('Error in context')
  }

  return context
}