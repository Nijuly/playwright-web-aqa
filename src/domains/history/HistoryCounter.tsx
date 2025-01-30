'use client'
import { useHistory } from './HistoryProvider'

export default function HistoryCounter() {
  const { history } = useHistory()

  return history.length
}
