import React from 'react'

import './App.css'
import HadleFileAndHashTag from './components/hadlefileandhashTag/HadleFileAndHashTag'
import AddNewTwitterData from './components/addnewtwitterdata/AddNewTwitterData'
import AppProvider from './AppProvider'
import LoderComponent from './components/loading/LoaderComponent'
import LoderProvider from './components/loading/LoaderProvider'
function App() {
  return (
    <LoderProvider>
      <div className="App">
        <LoderComponent />
        <AppProvider>
          <AddNewTwitterData />
          <HadleFileAndHashTag />
        </AppProvider>
      </div>
    </LoderProvider>
  )
}

export default App
