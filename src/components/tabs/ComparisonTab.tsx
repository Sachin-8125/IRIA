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
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8 p-6 bg-white border border-gray-200 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-4">Select States/UTs to Compare</h3>
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
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selected.includes(state)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" domain={[0, 10]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="quality" fill="#3B82F6" name="Quality Score" />
                <Bar yAxisId="right" dataKey="coverage" fill="#10B981" name="Coverage %" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Comparative Statistics">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold">Metric</th>
                    {selected.map(state => (
                      <th key={state} className="px-4 py-2 text-left font-semibold">{state}</th>
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
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="px-4 py-2 font-medium text-gray-800">{metric.label}</td>
                      {selected.map(state => (
                        <td key={state} className="px-4 py-2 text-gray-700">
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
          <Filter size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Select at least 2 states/UTs to compare</p>
        </div>
      )}
    </main>
  )
}