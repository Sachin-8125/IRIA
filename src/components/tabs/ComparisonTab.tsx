import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Filter } from 'lucide-react'
import ChartCard from '../common/ChartCard'
import { stateWiseData, getAllStates } from '../../data/stateData'

export default function ComparisonTab() {
  const [selected, setSelected] = useState(['Gujarat', 'Bihar'])
  const states = getAllStates()

  const comparisonData = useMemo(() => {
    return selected.map(state => ({
      name: state,
      quality: stateWiseData[state].qualityScore,
      coverage: stateWiseData[state].coverage,
      density: stateWiseData[state].density * 10,
      investment: stateWiseData[state].investmentCrore / 100
    }))
  }, [selected])

  return (
    <main className="space-y-8">
      <div className="card p-6">
        <h3 className="font-semibold text-neutral-800 mb-4">Select States/UTs to Compare</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {states.map(state => (
            <button
              key={state}
              onClick={() => {
                if (selected.includes(state)) {
                  setSelected(selected.filter(s => s !== state))
                } else {
                  setSelected([...selected, state])
                }
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selected.includes(state)
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {state}
            </button>
          ))}
        </div>
      </div>

      {selected.length >= 2 ? (
        <>
          <ChartCard title="Quality Score Comparison">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" domain={[0, 10]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '0.5rem', 
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Legend />
                <Bar yAxisId="left" dataKey="quality" fill="#0ea5e9" name="Quality Score" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="coverage" fill="#14b8a6" name="Coverage %" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Comparative Statistics">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-neutral-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-neutral-800">Metric</th>
                    {selected.map(state => (
                      <th key={state} className="px-4 py-3 text-left font-semibold text-neutral-800">{state}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Quality Score', key: 'qualityScore' },
                    { label: 'Coverage %', key: 'coverage' },
                    { label: 'Total Roads (km)', key: 'totalRoads' },
                    { label: 'PMGSY Roads (km)', key: 'pmgsyRoads' }
                  ].map((metric, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-neutral-50' : ''}>
                      <td className="px-4 py-3 font-medium text-neutral-800">{metric.label}</td>
                      {selected.map(state => (
                        <td key={state} className="px-4 py-3 text-neutral-700">
                          {stateWiseData[state][metric.key as keyof typeof stateWiseData[keyof typeof stateWiseData]].toLocaleString()}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ChartCard>
        </>
      ) : (
        <div className="text-center py-12">
          <Filter size={48} className="mx-auto text-neutral-400 mb-4" />
          <p className="text-neutral-600">Select at least 2 states/UTs to compare</p>
        </div>
      )}
    </main>
  )
}