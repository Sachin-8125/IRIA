import { useState } from 'react'
import Header from './components/layout/Header'
import NavigationTabs from './components/layout/NavigationTabs'
import Footer from './components/layout/Footer'


function App() {
  return (
    <>
      <Header />
      <NavigationTabs activeTab="overview" setActiveTab={() => {}} />
        <Footer />
    </>
  )
}

export default App
