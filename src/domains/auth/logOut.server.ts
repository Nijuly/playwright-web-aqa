'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AUTH_COOKIE_NAME } from './AuthCookieName'

export const logOut = async () => {
  const cookieStore = await cookies()
  if (cookieStore.get(AUTH_COOKIE_NAME)) {
    cookieStore.delete(AUTH_COOKIE_NAME)
  }

  redirect('/')
}
