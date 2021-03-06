import Cookies from 'universal-cookie'

const cookies = new Cookies()

export function setCookie(cookieName: string, value: string, expiresAt?: Date): void {
  const options = {
    path: '/',
    sameSite: true,
    expires: expiresAt ? expiresAt : undefined,
  }

  cookies.set(cookieName, value, options)
}

export function getCookie(cookieName: string): string {
  return cookies.get(cookieName)
}

export function removeCookie(CookieName: string): void {
  cookies.remove(CookieName, { path: '/' })
}
