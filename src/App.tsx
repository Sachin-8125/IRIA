import { useState } from 'react'
import Header from './components/layout/Header'
import NavigationTabs from './components/layout/NavigationTabs'


function App() {

  return (
    <>
      <Header />
      <NavigationTabs activeTab="overview" setActiveTab={() => {}} />
    </>
  )
}

export default App
