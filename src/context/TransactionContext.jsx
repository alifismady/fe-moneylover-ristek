import { createContext, useReducer } from 'react'

export const TransactionContext = createContext()

export const transactionsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return {
        transactions: action.payload,
      }
    case 'CREATE_TRANSACTION':
      return {
        transactions: [action.payload, ...state.transactions],
      }
    case 'CLEAR_TRANSACTIONS': 
      return {
        transactions: [], 
      }
    default:
      return state
  }
}

export const TransactionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionsReducer, {
    transactions: null,
  })

  return (
    <TransactionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TransactionContext.Provider>
  )
}
