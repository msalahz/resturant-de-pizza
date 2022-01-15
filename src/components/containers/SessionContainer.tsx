import _noop from 'lodash/noop'
import { createContext, ReactElement, useContext, useMemo, useState } from 'react'

import { IUser } from '../../types'
import logger from '../../helpers/logger'
import { setCookie, getCookie, removeCookie } from '../../helpers/cookies'

interface SessionContextProps {
  login: (token: string, tokenExpireAt: Date) => void
  logout: () => void
  getUser: () => IUser | null
  isAuthenticated: () => boolean
}

/* Context */
const SessionContext = createContext<SessionContextProps>({
  login: _noop,
  logout: _noop,
  getUser: () => null,
  isAuthenticated: () => false,
})
SessionContext.displayName = 'SessionContext'

/* Provider */
function SessionProvider(props: { children: ReactElement; cookiePrefix: string }): ReactElement {
  const { children, cookiePrefix } = props

  const sessionCookieName = cookiePrefix

  const isAuthenticated = (): boolean => {
    return !!getCookie(sessionCookieName)
  }

  const getUser = (): IUser | null => {
    const userId = getCookie(sessionCookieName)
    return userId ? { id: userId } : null
  }

  const [, setAuthorized] = useState<boolean>(() => isAuthenticated())

  const login = (token: string, tokenExpireAt: Date): void => {
    setCookie(sessionCookieName, token, tokenExpireAt)
    setAuthorized(true)
  }

  const logout = (): void => {
    removeCookie(sessionCookieName)
    logger.info('cookies removed')

    setAuthorized(false)
    logger.info('logged out!')
  }

  const sessionContextProps: SessionContextProps = { login, getUser, logout, isAuthenticated }

  return <SessionContext.Provider value={sessionContextProps}>{children}</SessionContext.Provider>
}

/* useContext */
function useSession(): SessionContextProps {
  const context = useContext(SessionContext)

  if (context === undefined) {
    throw new Error(`SessionContext must be used within a SessionProvider`)
  }

  return useMemo(() => context || {}, [context])
}

export { SessionProvider, useSession }
