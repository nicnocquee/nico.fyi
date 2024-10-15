'use client'

import { Button } from '@/components/ui/button'
import { revalidateSheets } from './actions'

export const RefreshButton = () => {
  return (
    <Button onClick={() => revalidateSheets()} type="submit">
      Refresh
    </Button>
  )
}
