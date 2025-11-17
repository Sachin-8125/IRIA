import { useState } from 'react'
import Header from './components/layout/Header'
import NavigationTabs from './components/layout/NavigationTabs'
import Footer from './components/layout/Footer'
import OverviewTab from './components/tabs/OverviewTab'
import StateWiseAnalysisTab from './components/tabs/StateWiseAnalysisTab'
import ComparisonTab from './components/tabs/ComparisonTab'
import PoliciesTab from './components/tabs/PoliciesTab'

type TabType = 'overview' | 'statewise' | 'comparison' | 'policies'
function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const renderTab = () => {
    const tabComponents = {
      overview: <OverviewTab />,
      statewise: <StateWiseAnalysisTab />,
      comparison: <ComparisonTab />,
      policies: <PoliciesTab />,
    }
    return tabComponents[activeTab]
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 flex flex-col">
      <Header />
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 container mx-auto px-4 py-6 transition-all duration-300">
        {renderTab()}
      </main>
      <Footer />
    </div>
  )
}

export default App