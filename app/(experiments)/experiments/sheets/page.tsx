import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RefreshButton } from './client'
import { SheetData, getPrivateGoogleSheetsData } from './sheets'

export default async function PublicGoogleSheetKVDisplay() {
  let data: SheetData | null = null
  let error: string | null = null

  try {
    data = await getPrivateGoogleSheetsData()
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

  const featureFlag1 = data?.['FEATURE_FLAG_1'].toLowerCase() === 'true'

  return (
    <div className="space-y-4">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Key Values in Google Sheets</CardTitle>
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

      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Feature Flag 1</CardTitle>
        </CardHeader>
        <CardContent>
          {featureFlag1 ? <p>Feature flag 1 is enabled</p> : <p>Feature flag 1 is disabled</p>}
        </CardContent>
      </Card>
    </div>
  )
}
