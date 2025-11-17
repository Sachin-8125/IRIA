export interface RoadTypeData {
  name: string
  value: number
  percentage: number | string
}

export interface QualityData {
  category: string
  value: number
}

export interface PerformanceData {
  metric: string
  value: number
}

export interface ComparisonData {
  name: string
  quality: number
  coverage: number
  density: number
  investment: number
}

export interface TrafficData {
  corridor: string
  capacity: number
  demand: number
}

export interface SafetyFeature {
  feature: string
  adoption: number
}
