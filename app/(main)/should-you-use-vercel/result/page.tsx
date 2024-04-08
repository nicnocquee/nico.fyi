import { decisionTree, findNodeById } from '../data'
import { turso } from '../turso'

export default async function ResultPage() {
  const result = await turso.execute('SELECT * FROM responses')
  const rows = result.rows as unknown as { id: number; answers: string; count: number }[]

  const endNodes = rows.map((row) => {
    const id = row.answers.split('>>>').at(-1)
    console.log(id)
    if (!id) return null
    const node = findNodeById(decisionTree, id, decisionTree)
    console.log(node)
    if (!node) return null
    if ('next' in node)
      return {
        node: node.next,
        count: row.count,
      }
    return null
  })

  console.log(endNodes)

  return (
    <div>
      {(rows as unknown as { id: number; answers: string; count: number }[]).map((row) => (
        <div key={row.id}>
          <p>{row.answers}</p>
          <p>{row.count}</p>
        </div>
      ))}
    </div>
  )
}
