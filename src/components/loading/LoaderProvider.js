import React, { useState, createContext } from 'react'

export const LoderContext = createContext()
export default function LoderProvider({ children }) {
  const [showLoader, setShowLoader] = useState(true)
  return (
    <LoderContext.Provider value={{ showLoader, setShowLoader }}>
      {children}
    </LoderContext.Provider>
  )
}
