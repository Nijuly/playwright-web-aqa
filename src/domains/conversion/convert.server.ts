'use server'
import { headers } from 'next/headers'
import { sleep } from '~/lib/sleep'
import { getRandomFromArray } from '~/lib/getRandomFromArray'
import { config } from '~/lib/config'

const originFromRSC = async () => {
  const headersList = await headers()
  const protocol = headersList.get('x-forwarded-proto')
  const host = headersList.get('x-forwarded-host')

  if (!protocol || !host) {
    throw new Error('Missing protocol or host in headers')
  }

  return `${protocol}://${host}`
}

export const convert = async (_prevState: any, formData: FormData) => {
  const origin = await originFromRSC()
  const fileField = formData.get('file')
  if (!fileField) {
    return { error: 'No file provided', url: '' }
  }

  const file = JSON.parse(fileField as string) as Pick<File, 'name' | 'size' | 'type'>

  if (file.type !== 'application/pdf') {
    return {
      error: getRandomFromArray(config.convert.errors.other),
      url: '',
    }
  }

  if (config.convert.config.conversionTime) {
    await sleep(config.convert.config.conversionTime)
  }

  if (Math.random() < config.convert.config.pdfErrorChance) {
    return {
      error: getRandomFromArray(config.convert.errors.pdf),
      url: '',
    }
  }

  return {
    error: '',
    url: `${origin}/api/docs/converted-file.docx`,
  }
}
