import React, { useState } from 'react'

const SessionContext = React.createContext(null)

export const useSession = () => {
  const ctx = React.useContext(SessionContext)
  if (!ctx) {
    throw new Error('useSessionContext must be used inside SessionProvider')
  }
  return ctx
}

export const SessionProvider = ({ children }) => {
    const oldItens = localStorage.getItem('games')
    const [itens, setItens] = useState(oldItens ? JSON.parse(oldItens) : [])
    const handleSetItens = (newItens) => {
      localStorage.setItem('games', JSON.stringify(newItens))
      setItens(newItens)
    }
  return (
    <SessionContext.Provider value={{itens, setItens: handleSetItens}}>
      {children}
    </SessionContext.Provider>
  )
}