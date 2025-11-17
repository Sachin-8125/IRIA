export const getQualityColor = (quality: number): 'primary' | 'success' | 'warning' | 'danger' => {
  if (quality >= 8) return 'success'
  if (quality >= 6.5) return 'primary'
  if (quality >= 5) return 'warning'
  return 'danger'
}

export const getRiskLevel = (fatality: number): 'low' | 'medium' | 'high' => {
  if (fatality < 30) return 'low'
  if (fatality < 45) return 'medium'
  return 'high'
}

export const getCoverageLevel = (coverage: number): 'excellent' | 'good' | 'fair' | 'poor' => {
  if (coverage >= 90) return 'excellent'
  if (coverage >= 75) return 'good'
  if (coverage >= 60) return 'fair'
  return 'poor'
}

export const sortStatesBy = (
  states: string[],
  key: string,
  data: Record<string, any>,
  order: 'asc' | 'desc' = 'desc',
): string[] => {
  return [...states].sort((a, b) => {
    const aVal = data[a]?.[key] || 0
    const bVal = data[b]?.[key] || 0
    return order === 'desc' ? bVal - aVal : aVal - bVal
  })
}

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}