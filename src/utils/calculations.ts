export const calculateQualityScore = (
  excellent: number,
  good: number,
  fair: number,
  poor: number,
): number => {
  const total = excellent + good + fair + poor
  if (total === 0) return 0
  return ((excellent * 4 + good * 3 + fair * 2 + poor) / (total * 4)) * 10
}

export const calculateFatalityRate = (deaths: number, accidents: number): number => {
  if (accidents === 0) return 0
  return (deaths / accidents) * 100
}

export const calculateRoadDensity = (totalRoads: number, areaSize: number): number => {
  if (areaSize === 0) return 0
  return totalRoads / areaSize
}

export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0
  return (value / total) * 100
}

export const calculateAverage = (values: number[]): number => {
  if (values.length === 0) return 0
  return values.reduce((sum, val) => sum + val, 0) / values.length
}