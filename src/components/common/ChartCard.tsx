interface ChartCardProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export default function ChartCard({ title, description, children, className = '' }: ChartCardProps) {
  return (
    <div className={`card p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>
        {description && <p className="text-gray-600 text-sm">{description}</p>}
      </div>
      <div className="w-full overflow-x-auto">
        {children}
      </div>
    </div>
  )
}