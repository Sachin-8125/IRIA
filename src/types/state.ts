export interface StateMetrics {
  totalRoads: number
  nh: number
  sh: number
  dr: number
  rural: number
  qualityScore: number
  excellent: number
  good: number
  fair: number
  poor: number
  density: number
  coverage: number
  accidents: number
  deaths: number
  maintenanceBudget: number
  pmgsyRoads: number
  investmentCrore: number
}

export type StateData = Record<string, StateMetrics>
export type StateOrUT = keyof StateData