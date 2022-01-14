import { v4 as uuidv4 } from 'uuid'

export const uuid = uuidv4

export const stringify = JSON.stringify

export const isProduction = (): boolean => {
  return !(!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
}

export const dateWithMonthsDelay = (months: number): Date => {
  const date = new Date()
  date.setMonth(date.getMonth() + months)

  return date
}
