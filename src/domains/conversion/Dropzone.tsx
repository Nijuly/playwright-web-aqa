'use client'
import { useState, useActionState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Alert } from '~/domains/notifications/Alert'
import { convert } from './convert.server'
import { config } from '~/lib/config'
import { useHistory } from '~/domains/history/HistoryProvider'
import { CloseIcon } from '~/components/CloseIcon'

const initialState = { error: '', url: '' }

const fileId = (file: File) => `${file.name}-${file.size}`

export const Dropzone = () => {
  const history = useHistory()
  const [{ url, error }, submit, isLoading] = useActionState((state: any, payload?: FormData) => {
    if (!payload) return initialState

    return convert(state, payload)
  }, initialState)

  const [file, setFile] = useState<File | null>(null)
  const onDrop = ([acceptedFile]: File[]) => {
    setFile(acceptedFile)

    history.addItem({
      id: fileId(acceptedFile),
      name: acceptedFile.name,
      size: acceptedFile.size,
      createdAt: new Date().toISOString(),
      status: 'added',
    })
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false })
  const isDownloadHidden = Math.random() < config.convert.config.hideDownloadButtonChance
  const removeFile = () => {
    setFile(null)
    submit()
  }

  useEffect(() => {
    if (url && file) {
      history.changeItemStatus(fileId(file), 'converted')
    }
  }, [url, file])

  useEffect(() => {
    if (error && file) {
      history.changeItemStatus(fileId(file), 'failed')
    }
  }, [error, file])

  return (
    <form className="flex flex-col gap-4 sm:w-3/5 md:2/5 lg:w-96" action={submit}>
      {!file && (
        <div
          {...getRootProps()}
          className={`
          flex
          flex-col items-center justify-center
          h-80 rounded-xl
          transition-colors
          border-2 border-dashed ${isDragActive ? 'bg-slate-200 border-blue-400' : 'bg-slate-100 border-slate-400'}
      `.trim()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop PDF files here</p>
          ) : (
            <p className="text-center">
              Drag 'n' drop PDF files here,
              <br />
              or click to select files
            </p>
          )}
        </div>
      )}
      {error && <Alert type="alert-error">{error}</Alert>}
      {url && <Alert type="alert-success">File converted successfully!</Alert>}
      {file && (
        <>
          <input
            type="hidden"
            name="file"
            value={JSON.stringify({ name: file.name, type: file.type, size: file.size })}
          />
          <div className="card bg-base-200 shadow-sm rounded-xl">
            <div className="card-body">
              <h2 className="card-title">{file.name}</h2>
              <p>{file.type}</p>
              <p>{file.size} bytes</p>
              <div className="card-actions justify-end">
                {url && !isDownloadHidden && (
                  <a href={url} className="btn btn-primary">
                    Download DOCX file
                  </a>
                )}
              </div>
            </div>

            <div className="absolute top-4 right-4">
              <button type="button" onClick={removeFile} className="btn btn-square btn-sm">
                <CloseIcon />
              </button>
            </div>
          </div>
        </>
      )}
      {isLoading && (
        <div>
          <p>Real PDF Convert is in Progress! Honestly!</p>
          <progress className="progress"></progress>
        </div>
      )}
      <button type="submit" className="btn btn-primary" disabled={!file || isLoading || Boolean(url) || Boolean(error)}>
        Convert PDF file
      </button>
    </form>
  )
}
