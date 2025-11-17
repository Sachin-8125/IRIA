import { useMemo } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, MapPin, CheckCircle, AlertCircle } from 'lucide-react'
import StatCard from '../common/StatCard'
import ChartCard from '../common/ChartCard'
import { stateWiseData, getAllStates } from '../../data/stateData'

export default function OverviewTab() {
  const allStates = getAllStates()
  const avgQuality = (allStates.reduce((sum, s) => sum + stateWiseData[s].qualityScore, 0) / allStates.length).toFixed(1)
  const totalRoads = allStates.reduce((sum, s) => sum + stateWiseData[s].totalRoads, 0)
  
  const roadTypeData = useMemo(() => [
    { name: 'National Highways', value: 48000, percentage: 2 },
    { name: 'State Highways', value: 176000, percentage: 8 },
    { name: 'District Roads', value: 610000, percentage: 28 },
    { name: 'Rural Roads', value: 1200000, percentage: 62 }
  ], [])

  const COLORS = ['#0ea5e9', '#14b8a6', '#f59e0b', '#ef4444']

  const qualityRankingData = useMemo(() => {
    return allStates
      .map(s => ({
        state: s,
        quality: stateWiseData[s].qualityScore
      }))
      .sort((a, b) => b.quality - a.quality)
  }, [])

  return (
    <main className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Average Quality Score" value={`${avgQuality}/10`} icon={TrendingUp} color="primary" />
        <StatCard label="Total Road Network" value={`${(totalRoads / 1000000).toFixed(2)}M km`} icon={MapPin} color="success" />
        <StatCard label="States & UTs" value={allStates.length} icon={CheckCircle} color="warning" />
        <StatCard label="Avg Coverage" value="85%" icon={AlertCircle} color="danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard title="Road Network Composition by Type">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roadTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="percentage"
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="State-wise Quality Score Ranking">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={qualityRankingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="state" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 10]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '0.5rem', 
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Bar dataKey="quality" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Coverage Distribution Across States">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={allStates.map(s => ({
              state: s,
              coverage: stateWiseData[s].coverage
            })).sort((a, b) => b.coverage - a.coverage)}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="state" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '0.5rem', 
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="coverage" 
              stroke="#14b8a6" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#14b8a6' }} 
              activeDot={{ r: 6, fill: '#14b8a6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </main>
  )
}