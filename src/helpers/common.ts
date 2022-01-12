export const stringify = JSON.stringify

export const isProduction = (): boolean => {
  return !(!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
}
