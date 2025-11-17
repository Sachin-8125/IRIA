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
    <div className="card overflow-hidden">
      <button
        onClick={() => onToggle(id)}
        className="w-full px-6 py-4 bg-gradient-to-r from-primary-50 to-primary-100 hover:from-primary-100 hover:to-primary-200 flex items-center justify-between transition-all duration-300"
      >
        <h3 className="font-semibold text-neutral-800">{title}</h3>
        <ChevronDown
          size={20}
          className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      {expanded && <div className="p-6 bg-white">{children}</div>}
    </div>
  )
}