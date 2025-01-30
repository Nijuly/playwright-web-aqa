'use client'
import { createContext, useContext, useState, useMemo, useEffect } from 'react'
import type { HistoryItem } from './HistoryItem'

type HistoryContextType = {
  history: HistoryItem[]
  addItem: (item: HistoryItem) => void
  removeItem: (id: string) => void
  clearAll: () => void
  changeItemStatus: (id: string, status: HistoryItem['status']) => void
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined)

const STORAGE_KEY = 'file-history'

export const HistoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  }, [history])

  const addItem = (item: HistoryItem) => {
    setHistory((prevHistory) => [...prevHistory.filter((currentItem) => currentItem.id !== item.id), item])
  }

  const removeItem = (id: string) => {
    setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id))
  }

  const clearAll = () => {
    setHistory([])
  }

  const changeItemStatus = (id: string, status: HistoryItem['status']) => {
    setHistory((prevHistory) => prevHistory.map((item) => (item.id === id ? { ...item, status } : item)))
  }

  const value = useMemo(
    () => ({
      history,
      addItem,
      removeItem,
      clearAll,
      changeItemStatus,
    }),
    [history]
  )

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
}

export const useHistory = (): HistoryContextType => {
  const context = useContext(HistoryContext)
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider')
  }
  return context
}
