import { useState, useMemo } from 'react'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import ChartCard from '../common/ChartCard'
import ToggleSection from '../common/ToggleSection'
import { stateWiseData, getAllStates } from '../../data/stateData'

export default function StateWiseAnalysisTab() {
  const [selectedState, setSelectedState] = useState('Gujarat')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const states = getAllStates()
  const data = stateWiseData[selectedState]

  const roadTypeData = useMemo(() => [
    { name: 'National Highways', value: data.nh, percentage: ((data.nh / data.totalRoads) * 100).toFixed(1) },
    { name: 'State Highways', value: data.sh, percentage: ((data.sh / data.totalRoads) * 100).toFixed(1) },
    { name: 'District Roads', value: data.dr, percentage: ((data.dr / data.totalRoads) * 100).toFixed(1) },
    { name: 'Rural Roads', value: data.rural, percentage: ((data.rural / data.totalRoads) * 100).toFixed(1) }
  ], [data])

  const qualityData = [
    { category: 'Excellent', value: data.excellent },
    { category: 'Good', value: data.good },
    { category: 'Fair', value: data.fair },
    { category: 'Poor', value: data.poor }
  ]

  const performanceData = [
    { metric: 'Quality', value: (data.qualityScore / 10) * 100 },
    { metric: 'Coverage', value: data.coverage },
    { metric: 'Safety', value: Math.max(0, 100 - (data.deaths / data.accidents * 20)) },
    { metric: 'Maintenance', value: Math.min(100, (data.maintenanceBudget / 500) * 100) }
  ]

  const COLORS = ['#14b8a6', '#0ea5e9', '#f59e0b', '#ef4444']

  return (
    <main className="space-y-8">
      <div className="card p-6">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-neutral-700 mb-3">Select State/UT:</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <h3 className="text-2xl font-bold text-neutral-800 mb-6">{selectedState}</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-neutral-600">Quality Score</p>
            <p className="text-2xl font-bold text-blue-600">{data.qualityScore}/10</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-500">
            <p className="text-sm text-neutral-600">Coverage</p>
            <p className="text-2xl font-bold text-green-600">{data.coverage}%</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border-l-4 border-purple-500">
            <p className="text-sm text-neutral-600">Total Roads</p>
            <p className="text-2xl font-bold text-purple-600">{(data.totalRoads / 1000).toFixed(0)}K km</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border-l-4 border-orange-500">
            <p className="text-sm text-neutral-600">Maintenance Budget</p>
            <p className="text-2xl font-bold text-orange-600">₹{data.maintenanceBudget}Cr</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Road Network Composition">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={roadTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${percent}%`}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {COLORS.map((color, idx) => (
                    <Cell key={`cell-${idx}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} km`} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Road Quality Distribution">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={qualityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '0.5rem', 
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <ChartCard title="Overall Performance Metrics">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={performanceData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Performance" dataKey="value" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '0.5rem', 
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border-l-4 border-red-500">
            <h4 className="font-semibold text-neutral-800 mb-2">Safety Statistics</h4>
            <div className="space-y-2 text-sm text-neutral-700">
              <p>Annual Accidents: <strong>{data.accidents.toLocaleString()}</strong></p>
              <p>Deaths: <strong>{data.deaths.toLocaleString()}</strong></p>
              <p>Fatality Rate: <strong>{((data.deaths / data.accidents) * 100).toFixed(1)}%</strong></p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-500">
            <h4 className="font-semibold text-neutral-800 mb-2">Development Programs</h4>
            <div className="space-y-2 text-sm text-neutral-700">
              <p>PMGSY Roads: <strong>{data.pmgsyRoads.toLocaleString()} km</strong></p>
              <p>Investment: <strong>₹{data.investmentCrore} Crore</strong></p>
              <p>Density: <strong>{data.density} km/sq km</strong></p>
            </div>
          </div>
        </div>
      </div>

      <ToggleSection
        title="Infrastructure Breakdown"
        id="breakdown"
        expanded={expandedSection === 'breakdown'}
        onToggle={setExpandedSection}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-neutral-800 mb-4">Road Categories</h4>
            <div className="space-y-3">
              {[
                { label: 'National Highways', value: data.nh },
                { label: 'State Highways', value: data.sh },
                { label: 'District Roads', value: data.dr },
                { label: 'Rural Roads', value: data.rural }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-neutral-700">{item.label}</span>
                  <span className="font-bold text-neutral-900">{item.value.toLocaleString()} km</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-800 mb-4">Quality Indicators</h4>
            <div className="space-y-3">
              {[
                { label: 'Excellent Roads', value: `${data.excellent}%` },
                { label: 'Good Roads', value: `${data.good}%` },
                { label: 'Fair Roads', value: `${data.fair}%` },
                { label: 'Poor Roads', value: `${data.poor}%` }
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-neutral-700">{item.label}</span>
                    <span className="text-sm text-neutral-600">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ToggleSection>
    </main>
  )
}