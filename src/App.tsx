import { useState } from 'react'
import Header from './components/layout/Header'
import NavigationTabs from './components/layout/NavigationTabs'
import Footer from './components/layout/Footer'

type TabType = 'overview' | 'statewise' | 'comparison' | 'policies'
function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex flex-col">
      <Header />
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <Footer />
    </div>
  )
}

export default App
