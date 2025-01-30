import type { Metadata } from 'next'
import './globals.css'
import { hasUser } from '~/domains/auth/hasUser'
import Link from 'next/link'
import { logOut } from '~/domains/auth/logOut.server'
import { HistoryProvider } from '~/domains/history/HistoryProvider'

export const metadata: Metadata = {
  title: 'AQA Test Application',
  description: 'Test it completely',
}

const Header = ({ isLoggedIn }: { isLoggedIn: boolean }) => (
  <header className="navbar bg-base-100 border-b border-b-base-200 shadow-sm">
    <div className="flex-1">
      <Link className="btn btn-ghost text-xl" href="/">
        ⌨️ LOGO 🥸
      </Link>
    </div>
    <div className="flex-none">
      {isLoggedIn && (
        <ul className="menu menu-horizontal px-1">
          <li>
            <button className="btn btn-neutral" onClick={logOut}>
              Log out
            </button>
          </li>
        </ul>
      )}
    </div>
  </header>
)

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isLoggedIn = await hasUser()
  return (
    <html lang="en" className="min-h-screen">
      <body className="min-h-screen flex flex-col justify-between">
        <Header isLoggedIn={isLoggedIn} />
        <HistoryProvider>{children}</HistoryProvider>
      </body>
    </html>
  )
}
