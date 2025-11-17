import type { LucideIcon }  from "lucide-react";

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  color: 'primary' | 'success' | 'warning' | 'danger'
}

const colorClasses = {
  primary: 'from-[#0ea5e9] to-[#0284c7]',
  success: 'from-[#10b981] to-[#14b8a6]',
  warning: 'from-[#f59e0b] to-[#f97316]',
  danger: 'from-[#ef4444] to-[#dc2626]',
} as const

export default function StatCard({label, value, icon:Icon, color} : StatCardProps) {
  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl p-6 text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}>
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 w-fit mb-4">
        <Icon size={28} className="opacity-90" />
      </div>
      <p className="text-sm opacity-90 mb-1">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}