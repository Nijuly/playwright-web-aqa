import { cookies } from 'next/headers'
import { AUTH_COOKIE_NAME } from './AuthCookieName'

export const hasUser = async () => {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(AUTH_COOKIE_NAME)

  return Boolean(cookie)
}
