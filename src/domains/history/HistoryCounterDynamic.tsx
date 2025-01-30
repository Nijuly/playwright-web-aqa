'use client'
import dynamic from 'next/dynamic'

export const HistoryCounterDynamic = dynamic(() => import('./HistoryCounter'), {
  loading: () => <p>Loading history...</p>,
  ssr: false,
})
