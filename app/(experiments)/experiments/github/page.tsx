/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMarkdownFile, getMarkdownFiles } from '@/lib/repo-sync/fetch'
import { isBefore, parse } from 'date-fns'

export default async function Page() {
  const files = await getMarkdownFiles()
  const entries = (
    await Promise.all(
      files.map(async (file) => {
        const content = await getMarkdownFile(file.path)
        return {
          content,
          name: file.name,
        }
      })
    )
  ).sort((a, b) => {
    return isBefore(
      parse(a.content.data.date, 'yyyy-MM-dd', new Date()),
      parse(b.content.data.date, 'yyyy-MM-dd', new Date())
    )
      ? 1
      : -1
  })

  return (
    <div>
      GitHub
      <ul>
        {entries.map((entry) => {
          const markdown = entry.content
          return (
            <li key={entry.name}>
              <details>
                <summary>{entry.name}</summary>
                <p>Title: {markdown?.data?.title}</p>
                <p>Published: {markdown?.data?.date}</p>
                <p>Tags: {markdown?.data?.tags?.join(', ')}</p>
                <p>Image: {markdown?.data?.images?.join(', ') || 'none'}</p>
                <p>Draft: {markdown?.data?.draft ? 'true' : 'false'}</p>
                <pre>{markdown?.content}</pre>
              </details>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
