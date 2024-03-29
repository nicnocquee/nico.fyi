/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getMarkdownFile,
  getMarkdownFiles,
} from '@/app/(experiments)/experiments/github/repo-sync/crud'
import { isBefore, parse } from 'date-fns'
import { TextareaForm } from './editor'

export default async function Page() {
  const files = await getMarkdownFiles()
  const entries = (
    await Promise.all(
      files.map(async (file) => {
        const data = await getMarkdownFile(file.path)
        return {
          ...data,
          name: file.name,
        }
      })
    )
  ).sort((a, b) => {
    return isBefore(
      parse(a.markdown.data.date, 'yyyy-MM-dd', new Date()),
      parse(b.markdown.data.date, 'yyyy-MM-dd', new Date())
    )
      ? 1
      : -1
  })

  return (
    <div>
      GitHub
      <ul>
        {entries.map(({ markdown, name, raw }) => {
          return (
            <li key={name}>
              <details>
                <summary>{name}</summary>
                <p>Title: {markdown?.data?.title}</p>
                <p>Published: {markdown?.data?.date}</p>
                <p>Tags: {markdown?.data?.tags?.join(', ')}</p>
                <p>Image: {markdown?.data?.images?.join(', ') || 'none'}</p>
                <p>Draft: {markdown?.data?.draft ? 'true' : 'false'}</p>
                <TextareaForm content={raw} />
              </details>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
