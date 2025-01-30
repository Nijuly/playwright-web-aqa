'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getRandomFromArray } from '~/lib/getRandomFromArray'
import { config } from '~/lib/config'
import { AUTH_COOKIE_NAME } from './AuthCookieName'

const VALID_EMAIL = 'aqa@example.com'
const VALID_PASSWORD = 'SecurePassword'

export const login = async (_prevState: any, formData: FormData) => {
  const cookieStore = await cookies()
  const email = formData.get('email') as string
  const password = formData.get('password')

  if (cookieStore.get(AUTH_COOKIE_NAME)) {
    cookieStore.delete(AUTH_COOKIE_NAME)
  }

  if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
    const error = email && password ? getRandomFromArray(config.auth.errors.login) : 'No empty fields allowed!'

    return {
      email,
      error,
    }
  }

  cookieStore.set(AUTH_COOKIE_NAME, config.auth.config.hasAuthCookieExposed ? `${email}:${password}` : 'secure-token', {
    httpOnly: false,
    secure: false,
    path: '/',
  })

  redirect('/convert')
}
