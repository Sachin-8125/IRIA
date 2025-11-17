import type { LucideIcon }  from "lucide-react";

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  color: 'primary' | 'success' | 'warning' | 'danger'
}

const colorClasses = {
  primary: 'from-primary-600 to-primary-700',
  success: 'from-success-600 to-success-700',
  warning: 'from-warning-600 to-warning-700',
  danger: 'from-danger-600 to-danger-700',
} as const

export default function StatCard({label, value, icon:Icon, color} : StatCardProps) {
  return (
    <div className={`bg-linear-to-br ${colorClasses[color]} rounded-xl p-6 text-white shadow-lg transition-transform hover:scale-105`}>
      <Icon size={28} className="mb-3 opacity-90" />
      <p className="text-sm opacity-90 mb-1">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}