import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import ChartCard from '../common/ChartCard'
import { getAllStates, stateWiseData } from '../../data/stateData'

export default function PoliciesTab() {
  const states = getAllStates()

  return (
    <main className="space-y-8">
      <ChartCard title="PMGSY Distribution by State">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={states
              .map(s => ({
                state: s,
                pmgsy: stateWiseData[s].pmgsyRoads
              }))
              .sort((a, b) => b.pmgsy - a.pmgsy)}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="state" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '0.5rem', 
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }} 
              formatter={(value) => [`${value} km`, 'Roads Constructed']}
            />
            <Bar dataKey="pmgsy" fill="#0ea5e9" name="Roads Constructed (km)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Government Investment Allocation">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={states
              .map(s => ({
                state: s,
                investment: stateWiseData[s].investmentCrore
              }))
              .sort((a, b) => b.investment - a.investment)}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="state" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '0.5rem', 
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }} 
              formatter={(value) => [`₹${value} Cr`, 'Investment']}
            />
            <Bar dataKey="investment" fill="#f59e0b" name="Investment (₹ Crore)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h4 className="font-semibold text-neutral-800 mb-4">Pradhan Mantri Gram Sadak Yojana (PMGSY)</h4>
          <ul className="space-y-2 text-sm text-neutral-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>All-weather road connectivity to unconnected habitations</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>660,000+ km roads constructed since 2000</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>180+ million people benefited</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Focus on rural areas and remote regions</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Ongoing upgrades to PMGSY-II for asset management</span>
            </li>
          </ul>
        </div>

        <div className="card p-6">
          <h4 className="font-semibold text-neutral-800 mb-4">Bharatmala Project</h4>
          <ul className="space-y-2 text-sm text-neutral-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Develop 65,000 km of highways</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Multi-phase strategic road development</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Focus on national corridors and connectivity</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Reduce logistics costs by 5-7%</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Reduce travel time by 20-25%</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}