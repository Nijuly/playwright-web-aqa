'use client'
import { useHistory } from '~/domains/history/HistoryProvider'
import type { HistoryItem } from '~/domains/history/HistoryItem'
import { CloseIcon } from '~/components/CloseIcon'
import Link from 'next/link'

const Item = ({ item }: { item: HistoryItem }) => {
  const { removeItem } = useHistory()
  const createdAt = new Date(item.createdAt)
  return (
    <div className="w-80 flex flex-col gap-4 justify-start bg-base-200 rounded-lg p-4 relative group">
      <div className="flex items-center gap-2 w-full">
        <div className="">
          {item.status === 'added' && '☑️'}
          {item.status === 'converted' && '✅'}
          {item.status === 'removed' && '🗑️'}
          {item.status === 'failed' && '❌'}
        </div>
        <div className="flex items-center justify-between w-full">
          <p>
            {createdAt.getDate()}-{createdAt.getMonth() + 1}-{createdAt.getFullYear()}
          </p>
        </div>
      </div>
      <div className="">
        <p className="text-base">{item.name}</p>
        <p className="text-xs">{item.size} bytes</p>
      </div>

      <button
        className="absolute top-0 right-0 p-2 hover:bg-base-300 transition-colors rounded-lg cursor-pointer hidden group-hover:block"
        onClick={() => {
          removeItem(item.id)
        }}
      >
        <CloseIcon />
      </button>
    </div>
  )
}

export default function History() {
  const { history, clearAll } = useHistory()

  return (
    <div className="flex flex-col gap-4">
      <Link href="/convert" className="link text-center">
        Back to convert
      </Link>
      {history.length > 0 && (
        <>
          <button className="btn btn-error btn-sm" onClick={clearAll}>
            Clear all entries
          </button>
          {history.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </>
      )}
      {history.length === 0 && <p className="text-neutral-content text-sm">- No history yet -</p>}
    </div>
  )
}
