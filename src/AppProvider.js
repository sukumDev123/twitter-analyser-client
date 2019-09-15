import React, { createContext, useState } from 'react'

export const AppContext = createContext()
export default function AppProvider({ children }) {
  const [showAddNewHashtag, setShowAddNewHashTag] = useState(false)
  return (
    <AppContext.Provider value={{ showAddNewHashtag, setShowAddNewHashTag }}>
      {children}
    </AppContext.Provider>
  )
}
