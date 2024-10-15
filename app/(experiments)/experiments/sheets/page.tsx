import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RefreshButton } from './client'
import { SheetData, getSheetDataWithServiceAccount } from './sheets'

export default async function PublicGoogleSheetKVDisplay() {
  let data: SheetData | null = null
  let error: string | null = null

  try {
    data = await getSheetDataWithServiceAccount()
  } catch (err) {
    error = 'Error fetching data from Google Sheet'
  }

  if (error) {
    return (
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Public Google Sheet Data</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-2">
          {data &&
            Object.entries(data).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <dt className="font-semibold">{key}:</dt>
                <dd>{value}</dd>
              </div>
            ))}
        </dl>
      </CardContent>
      <CardFooter>
        <RefreshButton />
      </CardFooter>
    </Card>
  )
}
