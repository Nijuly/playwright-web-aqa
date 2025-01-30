import { LoginForm } from '~/domains/auth/LoginForm'
import { hasUser } from '~/domains/auth/hasUser'
import Link from 'next/link'

const Dashboard = () => (
  <div className="text-center">
    <h1>Welcome!</h1>
    <Link href="/convert" className="btn btn-primary btn-link">
      Go to Convert PDF
    </Link>
  </div>
)

export default async function Home() {
  const isLoggedIn = await hasUser()

  return (
    <main className="flex flex-col flex-grow items-center justify-center px-4">
      {!isLoggedIn && <LoginForm />}
      {isLoggedIn && <Dashboard />}
    </main>
  )
}
