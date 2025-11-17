export const formatNumber = (num: number): string => num.toLocaleString('en-IN')

export const formatCurrency = (amount: number, decimals = 0): string => {
  const rounded = Math.round(amount * Math.pow(10, decimals)) / Math.pow(10, decimals)
  return `₹${formatNumber(rounded)} Cr`
}

export const formatPercentage = (value: number, decimals = 1): string => {
  return `${value.toFixed(decimals)}%`
}

export const formatDistance = (km: number): string => {
  if (km >= 1000000) return `${(km / 1000000).toFixed(2)}M km`
  if (km >= 1000) return `${(km / 1000).toFixed(0)}K km`
  return `${km} km`
}

export const formatQualityScore = (score: number): string => {
  return `${score.toFixed(1)}/10`
}

export const truncate = (text: string, length: number): string => {
  if (text.length <= length) return text
  return `${text.slice(0, length)}...`
}

export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}