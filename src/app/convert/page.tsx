import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Dropzone } from '~/domains/conversion/Dropzone'
import { sleep } from '~/lib/sleep'
import { config } from '~/lib/config'
import { HistoryCounterDynamic } from '~/domains/history/HistoryCounterDynamic'
import Link from 'next/link'

export default async function ConvertPage() {
  const headersList = await headers()
  const isFromAuth = headersList.get('sec-fetch-mode') !== 'navigate'
  if (config.convert.config.isAuthRequired && !isFromAuth) redirect('/')

  if (config.convert.config.pageLoadDelay) {
    await sleep(config.convert.config.pageLoadDelay)
  }

  return (
    <>
      <Link href="/history" className="mb-4 link">
        Go to upload history, files uploaded: <HistoryCounterDynamic />
      </Link>
      <Dropzone />
    </>
  )
}
