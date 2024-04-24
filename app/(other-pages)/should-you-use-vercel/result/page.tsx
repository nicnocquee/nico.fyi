import { turso } from '../turso'

export default async function ResultPage() {
  const { rows } = await turso.execute('SELECT * FROM responses')

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
