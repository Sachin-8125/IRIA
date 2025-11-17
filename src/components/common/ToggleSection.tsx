import { ChevronDown } from 'lucide-react'

interface ToggleSectionProps {
  title: string
  id: string
  expanded: boolean
  onToggle: (id: string) => void
  children: React.ReactNode
}

export default function ToggleSection({ title, id, expanded, onToggle, children }: ToggleSectionProps) {
  return (
    <div className="border border-gray-300 rounded-lg mb-4 overflow-hidden">
      <button
        onClick={() => onToggle(id)}
        className="w-full px-6 py-4 bg-linear-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 flex items-center justify-between transition-colors"
      >
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <ChevronDown
          size={20}
          className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      {expanded && <div className="p-6 bg-white">{children}</div>}
    </div>
  )
}