import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import ChartCard from '../common/ChartCard'
import { getAllStates, stateWiseData } from '../../data/stateData'

export default function PoliciesTab() {
  const states = getAllStates()

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-6">
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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="state" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="pmgsy" fill="#8B5CF6" name="Roads Constructed (km)" />
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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="state" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip formatter={(value) => `₹${value} Cr`} />
            <Bar dataKey="investment" fill="#F59E0B" name="Investment (₹ Crore)" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <h4 className="font-semibold text-gray-800 mb-4">Pradhan Mantri Gram Sadak Yojana (PMGSY)</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ All-weather road connectivity to unconnected habitations</li>
            <li>✓ 660,000+ km roads constructed since 2000</li>
            <li>✓ 180+ million people benefited</li>
            <li>✓ Focus on rural areas and remote regions</li>
            <li>✓ Ongoing upgrades to PMGSY-II for asset management</li>
          </ul>
        </div>

        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <h4 className="font-semibold text-gray-800 mb-4">Bharatmala Project</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ Develop 65,000 km of highways</li>
            <li>✓ Multi-phase strategic road development</li>
            <li>✓ Focus on national corridors and connectivity</li>
            <li>✓ Reduce logistics costs by 5-7%</li>
            <li>✓ Reduce travel time by 20-25%</li>
          </ul>
        </div>
      </div>
    </main>
  )
}