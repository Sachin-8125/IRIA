interface NavigationTabsProps{
  activeTab: string
  setActiveTab: (tab: string) => void
}

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'statewise', label: 'State/UT Analysis' },
  { id: 'comparison', label: 'Comparison' },
  { id: 'policies', label: 'Policies' },
]

export default function NavigationTabs({ activeTab, setActiveTab }: NavigationTabsProps){
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 border-b-2 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}