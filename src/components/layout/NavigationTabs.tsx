interface NavigationTabsProps{
  activeTab: 'overview' | 'statewise' | 'comparison' | 'policies'
  setActiveTab: (tab: 'overview' | 'statewise' | 'comparison' | 'policies') => void
}

const tabs = [
  { id: 'overview' as const, label: 'Overview' },
  { id: 'statewise' as const, label: 'State/UT Analysis' },
  { id: 'comparison' as const, label: 'Comparison' },
  { id: 'policies' as const, label: 'Policies' },
]

export default function NavigationTabs({ activeTab, setActiveTab }: NavigationTabsProps){
  return (
    <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex gap-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 font-medium transition-all whitespace-nowrap relative ${
                activeTab === tab.id
                  ? 'text-primary-400'
                  : 'text-gray-300 hover:text-primary-300 hover:bg-gray-700/50'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}