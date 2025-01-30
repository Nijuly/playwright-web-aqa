'use client'
import dynamic from 'next/dynamic'

const DynamicHistory = dynamic(() => import('~/domains/history/History'), {
  loading: () => <p>Loading history...</p>,
  ssr: false,
})

export default function HistoryPage() {
  return (
    <div className="flex flex-1 justify-center flex-col items-center my-8">
      <h3 className="text-lg mb-4">Items History</h3>
      <DynamicHistory />
    </div>
  )
}
