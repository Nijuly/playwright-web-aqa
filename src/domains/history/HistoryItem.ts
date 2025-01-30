export type HistoryItem = {
  id: string
  name: string
  size: number
  createdAt: string
  status: 'added' | 'removed' | 'converted' | 'failed'
}
