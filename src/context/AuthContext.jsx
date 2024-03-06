import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload.user,
        token: action.payload.token,
        balance: action.payload.user.balance,
        total_incomes: action.payload.user.total_incomes,
        total_expenses: action.payload.user.total_expenses,
      }
    case 'LOGOUT':
      return {
        user: null,
        token: null,
        balance: null,
        total_expenses: null,
        total_incomes: null,
      }
    case 'UPDATE_BALANCE':
      return {
        ...state,
        balance: action.payload.balance,
        total_incomes: action.payload.total_incomes,
        total_expenses: action.payload.total_expenses,
      }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
    balance: null,
    total_expenses: null,
    total_incomes: null,
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      dispatch({ type: 'LOGIN', payload: user })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
