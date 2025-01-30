import { NextApiRequest } from 'next'
import { readFile } from 'node:fs/promises'
import path from 'path'
import { config } from '~/lib/config'

export const GET = async (_req: NextApiRequest, { params }: { params: Promise<{ filename: string }> }) => {
  const fileName = (await params).filename
  const docFileName = Math.random() < config.convert.config.emptyResultFileChance ? 'empty.docx' : 'valid.docx'
  const filePath = path.join(process.cwd(), 'public', 'assets', 'docs', docFileName)

  const file = await readFile(filePath)
  if (!file) {
    throw new Error('File not found')
  }

  if (Math.random() < config.convert.config.fileDownloadCrashChance) {
    return new Response('Oops! Something went wrong', { status: 500 })
  }

  return new Response(file, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename=${fileName}`,
    },
  })
}
