import { v4 as uuidv4 } from 'uuid'

export const uuid = uuidv4

export const stringify = JSON.stringify

export const isProduction = (): boolean => {
  return !(!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
}
