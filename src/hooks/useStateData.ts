import { useState, useEffect } from 'react'
import type { StateMetrics } from '../types/state'
import { getStateData } from '../data/stateData'

export const useStateData = (stateName: string) => {
  const [data, setData] = useState<StateMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    try {
      setLoading(true)
      const stateData = getStateData(stateName)
      setData(stateData)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [stateName])

  return { data, loading, error }
}